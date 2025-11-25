// frontend/src/components/ErrorBanner.tsx
export  function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
      {message}
    </div>
  );
}
