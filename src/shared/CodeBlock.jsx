function CodeBlock() {
  return (
    <div className="rounded border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between border-gray-200 border-b px-4 py-2">
        <span className="text-gray-600 text-sm">스크립트</span>
        <button
          type="button"
          className="rounded border border-gray-300 bg-white px-3 py-1 text-gray-600 text-sm hover:bg-gray-50"
        >
          복사
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-gray-800 text-sm">code</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
