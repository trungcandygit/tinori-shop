import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   _: Request,
   { params }: { params: { userId: string } }
) {
   try {
      const user = await prisma.user.findUnique({
         where: { id: params.userId },
      })
      return NextResponse.json(user)
   } catch (error) {
      console.error('[USER_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(
   req: Request,
   { params }: { params: { userId: string } }
) {
   try {
      const body = await req.json()
      const { name, email, phone, isBanned } = body

      const user = await prisma.user.update({
         where: { id: params.userId },
         data: {
            ...(name !== undefined && { name }),
            ...(email !== undefined && { email }),
            ...(phone !== undefined && { phone }),
            ...(isBanned !== undefined && { isBanned }),
         },
      })

      return NextResponse.json(user)
   } catch (error) {
      console.error('[USER_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
