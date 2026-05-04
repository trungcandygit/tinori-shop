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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import type { OrderWithIncludes } from '@/types/prisma'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const ORDER_STATUSES = [
   'Processing',
   'Shipped',
   'Delivered',
   'ReturnProcessing',
   'ReturnCompleted',
   'Cancelled',
   'RefundProcessing',
   'RefundCompleted',
   'Denied',
]

const formSchema = z.object({
   status: z.string().min(1),
   shipping: z.coerce.number().min(0),
   payable: z.coerce.number().min(0),
   discount: z.coerce.number().min(0),
   isPaid: z.boolean().default(false).optional(),
   isCompleted: z.boolean().default(false).optional(),
})

type OrderFormValues = z.infer<typeof formSchema>

interface OrderFormProps {
   initialData: OrderWithIncludes | null
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
   const params = useParams()
   const [loading, setLoading] = useState(false)

   const defaultValues = initialData
      ? {
           status: initialData.status,
           shipping: Number(initialData.shipping),
           payable: Number(initialData.payable),
           discount: Number(initialData.discount),
           isPaid: initialData.isPaid,
           isCompleted: initialData.isCompleted,
        }
      : {
           status: 'Processing',
           shipping: 0,
           payable: 0,
           discount: 0,
           isPaid: false,
           isCompleted: false,
        }

   const form = useForm<OrderFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: OrderFormValues) => {
      try {
         setLoading(true)
         await fetch(`/api/orders/${params.orderId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            cache: 'no-store',
         })
         window.location.assign(`/orders`)
         toast.success('Đơn hàng đã được cập nhật.')
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
            className="block space-y-2 w-full"
         >
            <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Trạng Thái</FormLabel>
                     <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {ORDER_STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                 {s}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="shipping"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Phí Vận Chuyển (VNĐ)</FormLabel>
                     <FormControl>
                        <Input type="number" disabled={loading} {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="payable"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Tổng Thanh Toán (VNĐ)</FormLabel>
                     <FormControl>
                        <Input type="number" disabled={loading} {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="discount"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Giảm Giá (VNĐ)</FormLabel>
                     <FormControl>
                        <Input type="number" disabled={loading} {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="isPaid"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Đã Thanh Toán</FormLabel>
                        <FormDescription>
                           Đánh dấu đơn hàng đã được thanh toán.
                        </FormDescription>
                     </div>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="isCompleted"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl>
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <FormLabel>Hoàn Thành</FormLabel>
                        <FormDescription>
                           Đánh dấu đơn hàng đã hoàn thành.
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
