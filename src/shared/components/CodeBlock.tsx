import { useState } from "react";

type CodeForCopy = string;

interface CodeBlockProps {
  title: string;
  code: string;
}

function CodeBlock({ title, code }: CodeBlockProps): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopyCodeClick(codeForCopy: CodeForCopy) {
    try {
      await navigator.clipboard.writeText(codeForCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between border-gray-200 border-b px-4 py-2">
        <span className="text-gray-600 text-sm">{title}</span>
        <button
          type="button"
          className={`rounded border transition-all duration-200 ${isCopied ? "border-blue-500 bg-blue-100 text-blue-800" : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"} px-3 py-1 text-sm`}
          onClick={() => handleCopyCodeClick(code)}
        >
          {isCopied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre className="m-3 overflow-x-auto">
        <code className="font-mono text-blue-700 text-sm">{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
