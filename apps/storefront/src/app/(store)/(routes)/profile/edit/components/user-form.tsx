'use client'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { UserWithIncludes } from '@/types/prisma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   name: z.string().min(1),
   email: z.string().min(1),
   phone: z.string().min(1),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
   initialData: UserWithIncludes | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
   const router = useRouter()

   const [loading, setLoading] = useState(false)

   const defaultValues = initialData
      ? { ...initialData }
      : { name: '', phone: '', email: '' }

   const form = useForm<UserFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: UserFormValues) => {
      try {
         setLoading(true)

         await fetch(`/api/profile`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            cache: 'no-store',
         })

         router.refresh()
         toast.success('Thông tin đã được cập nhật.')
      } catch (error: any) {
         toast.error('Đã có lỗi xảy ra.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
         >
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Họ Tên</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Nguyễn Văn A"
                           {...field}
                        />
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
                        <Input
                           disabled={loading}
                           placeholder="ten@example.com"
                           {...field}
                        />
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
                        <Input
                           disabled={loading}
                           placeholder="0912 345 678"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
               Lưu Thay Đổi
            </Button>
         </form>
      </Form>
   )
}
