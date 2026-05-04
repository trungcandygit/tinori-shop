'use client'

import { Heading } from '@/components/native/heading'
import { CartContextProvider } from '@/state/Cart'

import { CartGrid } from './components/grid'

export default function Cart() {
   return (
      <CartContextProvider>
         <Heading
            title="Giỏ Hàng"
            description="Danh sách sản phẩm trong giỏ hàng của bạn."
         />
         <CartGrid />
      </CartContextProvider>
   )
}
