"use client"
// frontend/src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { LinkForm,LinksTable,ErrorBanner } from "@/components";
import apiClient from "@/lib/axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export interface LinkItem {
  code: string;
  targetUrl: string;
  shortUrl: string;
  clicks: number;
  lastClickedAt: string | null;
  createdAt: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadLinks = async () => {
    try {
      setLoading(true);
      setError(null);
      // const res = await axios.get<LinkItem[]>(`${API_BASE}/api/links`);
      const res = await apiClient.get('/api/links');
      setLinks(res.data);
    } catch  {
      setError("Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleCreate = async (url: string, code?: string) => {
    try {
      setError(null);
      const res = await apiClient.post(
        '/api/links',
       {
        url,
        code,
      }
      );
      setLinks((prev) => [res.data, ...prev]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("This short code is already taken. Please choose another.");
      } else if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to create link");
      } else {
        setError("Failed to create link");
      }
    }
  };

  const handleDelete = async (code: string) => {
    try {
      await apiClient.delete(`/api/links/${code}`);
      setLinks((prev) => prev.filter((l) => l.code !== code));
    } catch {
      setError("Failed to delete link");
    }
  };

  const filteredLinks = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.targetUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <p className="text-sm text-gray-600">
        Create short links, see click stats, and manage your URLs.
      </p>

      {error && <ErrorBanner message={error} />}

      <LinkForm onCreate={handleCreate} />

      <div className="flex justify-between items-center mt-4 mb-2 gap-2">
        <h3 className="font-medium">All Links</h3>
        <input
          type="text"
          className="border rounded px-2 py-1 text-sm w-full max-w-xs"
          placeholder="Search by code or URL…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <LinksTable
        links={filteredLinks}
        loading={loading}
        onDelete={handleDelete}
        loadLinks={loadLinks}
      />
    </div>
  );
}
