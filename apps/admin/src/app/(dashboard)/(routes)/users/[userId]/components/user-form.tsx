'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { UserWithIncludes } from '@/types/prisma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   name: z.string().optional(),
   email: z.string().optional(),
   phone: z.string().optional(),
   isBanned: z.boolean().default(false).optional(),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
   initialData: UserWithIncludes | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
   const params = useParams()
   const [loading, setLoading] = useState(false)

   const defaultValues = initialData
      ? {
           name: initialData.name ?? '',
           email: initialData.email ?? '',
           phone: initialData.phone ?? '',
           isBanned: initialData.isBanned,
        }
      : { name: '', email: '', phone: '', isBanned: false }

   const form = useForm<UserFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: UserFormValues) => {
      try {
         setLoading(true)
         await fetch(`/api/users/${params.userId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            cache: 'no-store',
         })
         window.location.assign(`/users`)
         toast.success('Người dùng đã được cập nhật.')
      } catch (error: any) {
         toast.error('Đã có lỗi xảy ra.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Họ Tên</FormLabel>
                     <FormControl>
                        <Input disabled={loading} placeholder="Họ và tên" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input disabled={loading} placeholder="Email" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="phone"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Số Điện Thoại</FormLabel>
                     <FormControl>
                        <Input disabled={loading} placeholder="Số điện thoại" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="isBanned"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Bị Cấm</FormLabel>
                        <FormDescription>
                           Người dùng này sẽ không thể đặt hàng hoặc đánh giá sản phẩm.
                        </FormDescription>
                     </div>
                  </FormItem>
               )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
               Lưu thay đổi
            </Button>
         </form>
      </Form>
   )
}
