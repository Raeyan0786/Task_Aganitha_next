import { LinkItem } from "@/app/page";
import Link from "next/link";
import { FaCopy, FaEye } from "react-icons/fa";
import DeleteDailog from "../DeleteDailog";
import toast from "react-hot-toast";

interface Props {
  links: LinkItem[];
  loading: boolean;
  onDelete: (code: string) => void;
}

export function LinksTable({ links, loading, onDelete }: Props) {
  const handleCopy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Successfully copied short URL")
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading links…</p>;
  }

  if (!links.length) {
    return (
      <p className="text-sm text-gray-500">
        No links yet. Create your first short link above.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Code</th>
            <th className="px-4 py-2 text-left">Target URL</th>
            <th className="px-4 py-2 text-left">Clicks</th>
            <th className="px-4 py-2 text-left">Last Clicked</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border-t">
              <td className="px-4 py-2">
                <Link
                  href={`/${l.code}`}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  {l.code}
                </Link>
              </td>
              <td className="px-4 py-2 max-w-xs">
                <div className="truncate" title={l.targetUrl}>
                  {l.targetUrl}
                </div>
              </td>
              <td className="px-4 py-2">{l.clicks}</td>
              <td className="px-4 py-2">
                {l.lastClickedAt
                  ? new Date(l.lastClickedAt).toLocaleString()
                  : "—"}
              </td>
              <td className="px-4 py-2 text-right space-x-2 flex justify-end items-center">
                <button
                  onClick={() => handleCopy(l.shortUrl)}
                  title="Copy"
                  className="text-xs p-1 border rounded hover:bg-gray-50 flex items-center"
                >
                  <FaCopy />
                </button>
                <DeleteDailog handleDelete={() => onDelete(l.code)}/>
                <Link href={`/code/${l.code}`} title="View">
                  <button className="text-xs p-1 border rounded hover:bg-gray-50 flex items-center">
                    <FaEye />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
