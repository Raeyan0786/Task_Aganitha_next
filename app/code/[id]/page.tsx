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
  const shortUrl = base ? `${base}/${link.code}` : `/${link.code}`;

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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow">
        <h2 className="text-base font-semibold mb-2">
          Stats for{' '}
          <span className="text-sky-400 font-mono">{stats.code}</span>
        </h2>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-slate-400 text-xs">Short URL</dt>
            <dd className="break-words">{stats.shortUrl}</dd>
          </div>

          <div>
            <dt className="text-slate-400 text-xs">Target URL</dt>
            <dd className="break-words">{stats.targetUrl}</dd>
          </div>

          <div className="flex gap-6">
            <div>
              <dt className="text-slate-400 text-xs">Total clicks</dt>
              <dd>{stats.clicks}</dd>
            </div>

            <div>
              <dt className="text-slate-400 text-xs">Last clicked</dt>
              <dd className="text-slate-300">
                {stats.lastClickedAt
                  ? new Date(stats.lastClickedAt).toLocaleString()
                  : 'Never'}
              </dd>
            </div>
          </div>

          <div>
            <dt className="text-slate-400 text-xs">Created at</dt>
            <dd className="text-slate-300">
              {new Date(stats.createdAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
