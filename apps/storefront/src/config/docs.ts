import { NavItem } from '@/types/nav'

interface DocsConfig {
   mainNav: NavItem[]
   sidebarNav: NavItem[]
}

export const docsConfig: DocsConfig = {
   mainNav: [
      {
         title: 'Sản Phẩm',
         href: '/products',
      },
      {
         title: 'Blog Thời Trang',
         href: '/blog',
      },
   ],
   sidebarNav: [
      {
         title: 'Sản Phẩm',
         href: '/products',
      },
      {
         title: 'Blog',
         href: '/blog',
      },
      {
         title: 'Đơn Hàng',
         href: '/profile/orders',
      },
      {
         title: 'Thanh Toán',
         href: '/profile/payments',
      },
      {
         title: 'Liên Hệ',
         href: '/contact',
      },
      {
         title: 'Giới Thiệu',
         href: '/about',
      },
   ],
}
