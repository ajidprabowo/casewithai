import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 space-y-1 list-disc list-inside">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 space-y-1 list-decimal list-inside">{children}</ol>,
          li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-3 italic text-gray-600 my-2">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-gray-200 my-3" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
