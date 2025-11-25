// frontend/src/components/LinkForm.tsx
import { FormEvent, useState } from "react";

interface Props {
  onCreate: (url: string, code?: string) => Promise<void> | void;
}

export  function LinkForm({ onCreate }: Props) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validate = () => {
    let ok = true;
    setUrlError(null);
    setCodeError(null);

    if (!url) {
      setUrlError("URL is required.");
      ok = false;
    }

    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      setCodeError("Code must be 6–8 characters [A-Za-z0-9].");
      ok = false;
    }

    return ok;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      setSuccessMsg(null);
      await onCreate(url, code || undefined);
      setUrl("");
      setCode("");
      setSuccessMsg("Link created successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 space-y-3"
    >
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-700">
            Long URL *
          </label>
          <input
            type="url"
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="https://example.com/very/long/link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {urlError && (
            <p className="text-xs text-red-600 mt-1">{urlError}</p>
          )}
        </div>
        <div className="w-full md:w-52">
          <label className="text-xs font-medium text-gray-700">
            Custom Code (optional)
          </label>
          <input
            type="text"
            className="mt-1 w-full border rounded px-3 py-2 text-sm"
            placeholder="e.g. mycode1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Must be 6–8 A–Z, a–z, 0–9.
          </p>
          {codeError && (
            <p className="text-xs text-red-600 mt-1">{codeError}</p>
          )}
        </div>
        <div className="flex items-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      {successMsg && (
        <p className="text-xs text-green-600 mt-1">{successMsg}</p>
      )}
    </form>
  );
}
