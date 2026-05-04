'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export function MainNav({
   className,
   ...props
}: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname()

   const routes = [
      {
         href: `/banners`,
         label: 'Banner',
         active: pathname.includes(`/banners`),
      },
      {
         href: `/categories`,
         label: 'Danh mục',
         active: pathname.includes(`/categories`),
      },
      {
         href: `/products`,
         label: 'Sản phẩm',
         active: pathname.includes(`/products`),
      },
      {
         href: `/orders`,
         label: 'Đơn hàng',
         active: pathname.includes(`/orders`),
      },
      {
         href: `/payments`,
         label: 'Thanh toán',
         active: pathname.includes(`/payments`),
      },
      {
         href: `/users`,
         label: 'Khách hàng',
         active: pathname.includes(`/users`),
      },
      {
         href: `/brands`,
         label: 'Thương hiệu',
         active: pathname.includes(`/brands`),
      },
      {
         href: `/codes`,
         label: 'Mã giảm giá',
         active: pathname.includes(`/codes`),
      },
   ]

   return (
      <nav
         className={cn('flex items-center space-x-4 lg:space-x-6', className)}
         {...props}
      >
         {routes.map((route) => (
            <Link
               key={route.href}
               href={route.href}
               className={cn(
                  'text-sm transition-colors hover:text-primary',
                  route.active
                     ? 'font-semibold'
                     : 'font-light text-muted-foreground'
               )}
            >
               {route.label}
            </Link>
         ))}
      </nav>
   )
}
