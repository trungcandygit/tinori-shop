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
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Brand } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   title: z.string().min(2),
   description: z.string().min(1).optional(),
   logo: z.string().optional(),
})

type BrandFormValues = z.infer<typeof formSchema>

interface BrandFormProps {
   initialData: Brand | null
}

export const BrandForm: React.FC<BrandFormProps> = ({ initialData }) => {
   const params = useParams()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const title = initialData ? 'Chỉnh Sửa Thương Hiệu' : 'Tạo Thương Hiệu Mới'
   const description = initialData ? 'Chỉnh sửa thông tin thương hiệu.' : 'Thêm thương hiệu mới'
   const toastMessage = initialData ? 'Thương hiệu đã được cập nhật.' : 'Thương hiệu đã được tạo.'
   const action = initialData ? 'Lưu thay đổi' : 'Tạo mới'

   const form = useForm<BrandFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         title: '',
         description: '',
         logo: '',
      },
   })

   const onSubmit = async (data: BrandFormValues) => {
      try {
         setLoading(true)
         const res = initialData
            ? await fetch(`/api/brands/${params.brandId}`, {
                 method: 'PATCH',
                 body: JSON.stringify(data),
                 cache: 'no-store',
              })
            : await fetch(`/api/brands`, {
                 method: 'POST',
                 body: JSON.stringify(data),
                 cache: 'no-store',
              })
         if (!res.ok) throw new Error(await res.text())
         toast.success(toastMessage)
         window.location.assign(`/brands`)
      } catch (error: any) {
         toast.error('Đã có lỗi xảy ra.')
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)
         await fetch(`/api/brands/${params.brandId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })
         window.location.assign(`/brands`)
         toast.success('Thương hiệu đã được xoá.')
      } catch (error: any) {
         toast.error('Hãy xoá tất cả sản phẩm thuộc thương hiệu này trước.')
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
                           <FormLabel>Tên Thương Hiệu</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Tên thương hiệu"
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
                                 placeholder="Mô tả thương hiệu"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="logo"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Logo URL</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="https://example.com/logo.png"
                                 {...field}
                              />
                           </FormControl>
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
