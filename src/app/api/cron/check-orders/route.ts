export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDepositReminderEmail, sendOrderCancelledEmail } from "@/lib/email";

export async function GET() {
  const now = new Date();

  // Tìm đơn PENDING_DEPOSIT chưa bị hủy
  const pendingOrders = await prisma.order.findMany({
    where: {
      status: "PENDING_DEPOSIT",
      depositStatus: "PENDING",
    },
  });

  let reminded = 0;
  let cancelled = 0;

  for (const order of pendingOrders) {
    const createdAt = new Date(order.createdAt);
    const minutesPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    // Sau 24h (1440 phút) → hủy đơn
    if (minutesPassed >= 1440) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "CANCELLED",
          cancelledAt: now,
        },
      });

      // Gửi email hủy đơn
      if (order.customerEmail) {
        sendOrderCancelledEmail(order.customerEmail, order.code).catch(console.error);
      }
      cancelled++;
      continue;
    }

    // Sau 60 phút → gửi email nhắc cọc (chỉ gửi 1 lần)
    if (minutesPassed >= 60 && !order.reminderSentAt) {
      if (order.customerEmail) {
        sendDepositReminderEmail(order.customerEmail, order.code).catch(console.error);
      }

      await prisma.order.update({
        where: { id: order.id },
        data: { reminderSentAt: now },
      });
      reminded++;
    }
  }

  return NextResponse.json({
    success: true,
    processed: pendingOrders.length,
    reminded,
    cancelled,
    timestamp: now.toISOString(),
  });
}
