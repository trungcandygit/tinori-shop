import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: { bannerId: string } }) {
   try {
      const body = await req.json()
      const { label, image } = body

      const banner = await prisma.banner.update({
         where: { id: params.bannerId },
         data: { label, image },
      })

      return NextResponse.json(banner)
   } catch (error) {
      console.error('[BANNER_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(_: Request, { params }: { params: { bannerId: string } }) {
   try {
      await prisma.banner.delete({ where: { id: params.bannerId } })
      return NextResponse.json({ message: 'Deleted' })
   } catch (error) {
      console.error('[BANNER_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
