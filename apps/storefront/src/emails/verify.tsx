import {
   Body,
   Button,
   Column,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Img,
   Link,
   Preview,
   Row,
   Section,
   Tailwind,
   Text,
} from '@react-email/components'
import React from 'react'

interface VercelInviteUserEmailProps {
   name?: string
   code?: string
}

export default function Verification({
   name = 'My Project',
   code = ``,
}: VercelInviteUserEmailProps) {
   const previewText = `Mã xác nhận đăng nhập ${name}`

   return (
      <Html>
         <Head />
         <Preview>{previewText}</Preview>
         <Tailwind>
            <Body className="my-auto mx-auto w-full max-w-lg">
               <Container className="border border-solid border-neutral-500/25 rounded mx-auto p-6">
                  <Heading className="mt-0">{name}</Heading>
                  <Text>
                     Xin chào! Đây là mã xác nhận đăng nhập vào tài khoản Tinori của bạn.
                  </Text>
                  <div className="w-3/4 bg-neutral-500/5 border border-solid border-neutral-400/25 rounded-lg px-6">
                     <pre className="text-base">{code}</pre>
                  </div>
                  <Text>
                     Nhập mã trên vào trang đăng nhập để xác minh tài khoản. Mã có hiệu lực trong 10 phút.
                     Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.
                  </Text>
                  <Hr className="border border-solid border-neutral-500/25 my-4 mx-0 w-full" />
                  <Text className="text-xs text-center mx-auto text-neutral-500/75">
                     © {new Date().getFullYear()} {name}™. Bảo lưu mọi quyền.
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}
