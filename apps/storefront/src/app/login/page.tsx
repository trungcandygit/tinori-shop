import config from '@/config/site'
import { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from '../login/components/user-auth-form'

export const metadata: Metadata = {
   title: 'Đăng Nhập',
   description: 'Đăng nhập vào tài khoản Tinori của bạn.',
}

export default function AuthenticationPage() {
   return (
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
         <div className="relative hidden bg-zinc-900 h-full flex-col bg-muted p-10 dark:border-r lg:flex">
            <Link
               href="/"
               className="relative z-20 flex items-center text-lg font-medium"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
               >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
               </svg>
               {config.name}
            </Link>
            <div className="relative z-20 mt-auto">
               <blockquote className="space-y-2">
                  <p className="text-lg">
                     &ldquo;Tinori mang đến cho tôi những bộ trang phục đẹp,
                     chất lượng tốt với giá cả hợp lý. Giao hàng nhanh, đóng
                     gói cẩn thận, tôi rất hài lòng!&rdquo;
                  </p>
                  <footer className="text-sm">Nguyễn Thị Hoa - Khách hàng thân thiết</footer>
               </blockquote>
            </div>
         </div>
         <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
               <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Đăng Nhập
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     Nhập email của bạn để đăng nhập hoặc tạo tài khoản mới.
                  </p>
               </div>
               <UserAuthForm />
               <p className="px-8 text-center text-sm text-muted-foreground">
                  Bằng cách tiếp tục, bạn đồng ý với{' '}
                  <Link
                     href="/terms"
                     className="underline underline-offset-4 hover:text-primary"
                  >
                     Điều Khoản Dịch Vụ
                  </Link>{' '}
                  và{' '}
                  <Link
                     href="/privacy"
                     className="underline underline-offset-4 hover:text-primary"
                  >
                     Chính Sách Bảo Mật
                  </Link>
                  .
               </p>
            </div>
         </div>
      </div>
   )
}
