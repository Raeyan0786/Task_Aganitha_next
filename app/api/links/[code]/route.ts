import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { Link } from '@/app/generated/prisma/client';

// @typescript-eslint/no-explicit-any
function toLinkResponse(link: Link) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  return {
    code: link.code,
    targetUrl: link.targetUrl,
    shortUrl: base ? `${base}/${link.code}` : `/${link.code}`,
    clicks: link.clicks,
    lastClickedAt: link.lastClickedAt,
    createdAt: link.createdAt,
  };
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
const {code}=await context.params;
  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(toLinkResponse(link));
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
    const {code}=await context.params;
  const existing = await prisma.link.findUnique({
    where: { code },
  });

  if (!existing) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  await prisma.link.delete({ where: { code } });

  return NextResponse.json({ ok: true });
}
