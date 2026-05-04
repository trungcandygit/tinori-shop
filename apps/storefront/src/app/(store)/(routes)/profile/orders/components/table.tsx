'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, XIcon } from 'lucide-react'
import { EditIcon as Icon } from 'lucide-react'
import Link from 'next/link'

export type OrderColumn = {
   id: string
   isPaid: boolean
   payable: string
   number: string
   createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
   {
      accessorKey: 'number',
      header: 'Mã Đơn Hàng',
   },
   {
      accessorKey: 'date',
      header: 'Ngày Đặt',
   },
   {
      accessorKey: 'payable',
      header: 'Tổng Tiền',
   },
   {
      accessorKey: 'isPaid',
      header: 'Đã Thanh Toán',
      cell: (props) => {
         return props.cell.getValue() ? <CheckIcon /> : <XIcon />
      },
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/profile/orders/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <Icon className="h-4" />
            </Button>
         </Link>
      ),
   },
]

interface OrdersTableProps {
   data: OrderColumn[]
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
   return <DataTable searchKey="products" columns={columns} data={data} />
}
