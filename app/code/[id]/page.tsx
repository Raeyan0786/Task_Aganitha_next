// app/code/[id]/page.tsx
import { Link } from '@/app/generated/prisma/client';
import  prisma  from '@/lib/prisma';
import { notFound } from 'next/navigation';

type LinkStats = {
  code: string;
  targetUrl: string;
  clicks: number;
  lastClickedAt: string | null;
  createdAt: string;
  shortUrl: string;
};

export default async function CodeStatsPage(
  context: { params: Promise<{ id: string }> }) {
  const { id } =await context.params;

  const link: Link | null = await prisma.link.findUnique({
    where: { code: id },
  });

  if (!link) {
    notFound();
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const shortUrl = base ? `${base}/api/${link.code}` : `/api/${link.code}`;

  const stats: LinkStats = {
    code: link.code,
    targetUrl: link.targetUrl,
    clicks: link.clicks,
    lastClickedAt: link.lastClickedAt
      ? link.lastClickedAt.toISOString()
      : null,
    createdAt: link.createdAt.toISOString(),
    shortUrl,
  };

  return (
    <div className="space-y-4">
      
        <h2 className="text-base font-semibold mb-2">
          Stats for{' '}
          <span className="text-sky-400 font-mono">{stats.code}</span>
        </h2>

        <div className="bg-white rounded-lg shadow p-4 text-sm space-y-2">
          <div>
            <div className="font-medium">Short URL</div>
            <dd className="text-blue-600 underline break-all">{stats.shortUrl}</dd>
          </div>

          <div>
            <div className="font-medium">Target URL</div>
            <dd className="break-all">{stats.targetUrl}</dd>
          </div>

          <div className="flex gap-6">
            <div>
              <div className="font-medium">Total clicks</div>
              <dd>{stats.clicks}</dd>
            </div>

            <div>
              <div className="font-medium">Last clicked</div>
              <dd className="">
                {stats.lastClickedAt
                  ? new Date(stats.lastClickedAt).toLocaleString()
                  : 'Never'}
              </dd>
            </div>
          </div>

          <div>
            <div className="font-medium">Created at</div>
            <dd className="">
              {new Date(stats.createdAt).toLocaleString()}
            </dd>
          </div>
        </div>
    </div>
  );
}
