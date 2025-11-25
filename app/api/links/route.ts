import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { Link } from '@/app/generated/prisma/client';

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function generateRandomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

//@typescript-eslint/no-explicit-any
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

export async function GET() {

  const links = await prisma.link.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(links.map(toLinkResponse));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, code: customCode } = body as { url?: string; code?: string };

    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid or missing URL' },
        { status: 400 }
      );
    }

    let code = customCode?.trim();

    if (code) {
      if (!CODE_REGEX.test(code)) {
        return NextResponse.json(
          { error: 'Code must match [A-Za-z0-9]{6,8}' },
          { status: 400 }
        );
      }

      const existing = await prisma.link.findUnique({ where: { code } });
      if (existing) {
        // Spec: 409 if code exists
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }
    } else {
      // Auto-generate code and ensure uniqueness
      let unique = false;
      let attempts = 0;
      while (!unique && attempts < 5) {
        code = generateRandomCode(6);
        const existing = await prisma.link.findUnique({ where: { code } });
        if (!existing) unique = true;
        attempts++;
      }
      if (!unique) {
        return NextResponse.json(
          { error: 'Could not generate unique code' },
          { status: 500 }
        );
      }
    }

    const link = await prisma.link.create({
      data: {
        code: code!,
        targetUrl: url,
      },
    });

    return NextResponse.json(toLinkResponse(link), { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
