'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Banner, Category } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   title: z.string().min(2),
   description: z.string().optional(),
   bannerId: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
   initialData: Category | null
   banners: Banner[]
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
   initialData,
   banners,
}) => {
   const params = useParams()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const title = initialData ? 'Chỉnh Sửa Danh Mục' : 'Tạo Danh Mục Mới'
   const description = initialData ? 'Chỉnh sửa thông tin danh mục.' : 'Thêm danh mục mới'
   const toastMessage = initialData ? 'Danh mục đã được cập nhật.' : 'Danh mục đã được tạo.'
   const action = initialData ? 'Lưu thay đổi' : 'Tạo mới'

   const form = useForm<CategoryFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData
         ? { title: initialData.title, description: initialData.description ?? '' }
         : { title: '', description: '', bannerId: '' },
   })

   const onSubmit = async (data: CategoryFormValues) => {
      try {
         setLoading(true)
         const res = initialData
            ? await fetch(`/api/categories/${params.categoryId}`, {
                 method: 'PATCH',
                 body: JSON.stringify(data),
                 cache: 'no-store',
              })
            : await fetch(`/api/categories`, {
                 method: 'POST',
                 body: JSON.stringify(data),
                 cache: 'no-store',
              })
         if (!res.ok) throw new Error(await res.text())
         toast.success(toastMessage)
         window.location.assign(`/categories`)
      } catch (error: any) {
         toast.error(error.message || 'Đã có lỗi xảy ra.')
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await fetch(`/api/categories/${params.categoryId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })
         window.location.assign(`/categories`)
         toast.success('Danh mục đã được xoá.')
      } catch (error: any) {
         toast.error('Hãy xoá tất cả sản phẩm thuộc danh mục này trước.')
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {initialData && (
               <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 w-full"
            >
               <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tên Danh Mục</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Tên danh mục"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Mô Tả</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Mô tả danh mục"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="bannerId"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Banner</FormLabel>
                           <Select
                              disabled={loading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue
                                       defaultValue={field.value}
                                       placeholder="Chọn banner"
                                    />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {banners.map((banner) => (
                                    <SelectItem
                                       key={banner.id}
                                       value={banner.id}
                                    >
                                       {banner.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
