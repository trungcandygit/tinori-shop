import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const users = await prisma.user.findMany({
         orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(users)
   } catch (error) {
      console.error('[USERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
