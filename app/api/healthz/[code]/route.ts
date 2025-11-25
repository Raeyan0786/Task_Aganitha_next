import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const {code} = await context.params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new NextResponse('Not found', { status: 404 });
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClickedAt: new Date(),
    },
  });

  return NextResponse.redirect(link.targetUrl, { status: 302 });
}
