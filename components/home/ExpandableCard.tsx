'use client'

import { useState } from 'react'

interface Props {
  summary: string
  contentHtml: string
}

export default function ExpandableCard({ summary, contentHtml }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Summary */}
      <p className="text-sm text-cream-600 leading-relaxed mb-3">
        {summary}
      </p>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-600 hover:text-sage-500 transition-colors group"
      >
        <span>{open ? '收起详情' : '展开阅读'}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="prose border-t border-cream-100 pt-4">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </div>
    </div>
  )
}
