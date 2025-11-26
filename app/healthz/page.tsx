"use client";

import apiClient from "@/lib/axios";
import { useEffect, useState } from "react";

interface HealthData {
  ok: boolean;
  version: string;
  uptime: number;
  timestamp: string;
  nodeVersion: string;
  environment: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get("/api//healthz");
        // const data = await res.json();
        console.log("res",res)
        setHealth(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!health) {
    return <p className="text-sm text-gray-600">Loading system health…</p>;
  }

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      <h2 className="text-lg font-semibold">System Health</h2>

      <div className="text-sm space-y-2">
        <p>
          <span className="font-medium">Status:</span>{" "}
          {health.ok ? "🟢 Healthy" : "🔴 Issues"}
        </p>

        <p>
          <span className="font-medium">Version:</span> {health.version}
        </p>

        <p>
          <span className="font-medium">Uptime:</span>{" "}
          {Math.round(health.uptime)} seconds
        </p>

        <p>
          <span className="font-medium">Timestamp:</span> {health.timestamp}
        </p>

        <p>
          <span className="font-medium">Node Version:</span>{" "}
          {health.nodeVersion}
        </p>

        <p>
          <span className="font-medium">Environment:</span>{" "}
          {health.environment}
        </p>
      </div>
    </div>
  );
}
