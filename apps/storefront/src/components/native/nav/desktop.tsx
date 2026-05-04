'use client'

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import config from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { forwardRef } from 'react'

const components: { title: string; href: string; description: string }[] = [
   {
      title: 'Thời Trang Nữ',
      href: '/products?category=Váy & Đầm',
      description: 'Váy đầm, áo kiểu, quần âu nữ thời trang.',
   },
   {
      title: 'Thời Trang Nam',
      href: '/products?category=Áo',
      description: 'Áo sơ mi, áo thun, quần jean nam phong cách.',
   },
   {
      title: 'Phụ Kiện',
      href: '/products?category=Phụ Kiện',
      description: 'Túi xách, mũ, thắt lưng và nhiều phụ kiện thời trang.',
   },
]

export function MainNav() {
   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center">
            <span className="hidden font-medium sm:inline-block">
               {config.name}
            </span>
         </Link>
         <NavMenu />
      </div>
   )
}

export function NavMenu() {
   return (
      <NavigationMenu>
         <NavigationMenuList>
            <NavigationMenuItem>
               <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                     <div className="font-normal text-foreground/70">
                        Sản Phẩm
                     </div>
                  </NavigationMenuLink>
               </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>
                  <div className="font-normal text-foreground/70">
                     Danh Mục
                  </div>
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                     <li className="row-span-3">
                        <NavigationMenuLink asChild>
                           <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/products"
                           >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                 Tinori
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                 Thời trang chất lượng cao, phong cách hiện đại cho mọi dịp.
                              </p>
                           </Link>
                        </NavigationMenuLink>
                     </li>
                     <ListItem href="/products?category=Áo" title="Áo">
                        Áo sơ mi, áo thun, áo khoác đa dạng mẫu mã.
                     </ListItem>
                     <ListItem href="/products?category=Quần" title="Quần">
                        Quần jean, quần âu, quần thể thao cho mọi phong cách.
                     </ListItem>
                     <ListItem href="/products?category=Váy & Đầm" title="Váy & Đầm">
                        Váy maxi, đầm công sở, đầm dự tiệc sang trọng.
                     </ListItem>
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               <NavigationMenuTrigger>
                  <div className="font-normal text-foreground/70">Thương Hiệu</div>
               </NavigationMenuTrigger>
               <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                     {components.map((component) => (
                        <ListItem
                           key={component.title}
                           title={component.title}
                           href={component.href}
                        >
                           {component.description}
                        </ListItem>
                     ))}
                  </ul>
               </NavigationMenuContent>
            </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>
   )
}

const ListItem = forwardRef<
   React.ElementRef<'a'>,
   React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
   return (
      <li>
         <NavigationMenuLink asChild>
            <Link
               href={href}
               ref={ref}
               className={cn(
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  className
               )}
               {...props}
            >
               <div className="text-sm font-medium leading-none">{title}</div>
               <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
               </p>
            </Link>
         </NavigationMenuLink>
      </li>
   )
})

ListItem.displayName = 'ListItem'
