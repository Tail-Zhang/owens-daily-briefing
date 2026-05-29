import Image from 'next/image'
import { getAllUpdates } from '@/lib/brands'
import { categoryLabels, type BrandUpdate } from '@/lib/types'
import { marked } from 'marked'
import ExpandableCard from '@/components/home/ExpandableCard'

function CategoryBadge({ category }: { category: BrandUpdate['category'] }) {
  const colors: Record<string, string> = {
    launch: 'bg-rose-100 text-rose-700',
    campaign: 'bg-blue-100 text-blue-700',
    collaboration: 'bg-purple-100 text-purple-700',
    retail: 'bg-emerald-100 text-emerald-700',
    trend: 'bg-amber-100 text-amber-700',
    other: 'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colors[category] || colors.other}`}>
      {categoryLabels[category]}
    </span>
  )
}

export default async function HomePage() {
  const updates = (await getAllUpdates()).map((u) => ({
    ...u,
    contentHtml: marked.parse(u.content) as string,
  }))

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-cream-900">
          Owen's Daily Briefing
        </h1>
        <p className="mt-2 text-base text-cream-500">香水品牌日报</p>
        <p className="mt-4 text-sm text-cream-500 max-w-lg mx-auto leading-relaxed">
          每日更新全球香水品牌最新动态、营销案例与市场趋势。
        </p>
      </section>

      {/* Feed */}
      <section className="max-w-2xl mx-auto px-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cream-500">
            最新动态
          </h2>
          <span className="text-xs text-cream-400 bg-cream-100 px-2 py-0.5 rounded-full">
            {updates.length} 条
          </span>
        </div>

        <div className="space-y-8">
          {updates.map((update) => (
              <article
                key={update.slug}
                className="bg-white border border-cream-200 rounded-xl overflow-hidden"
              >
                {/* Image */}
                {update.image && (
                  <div className="relative h-52 md:h-64 bg-cream-100">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 md:p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-sm text-cream-500 font-medium">
                      {update.brandNameEn}
                    </span>
                    <span className="text-cream-300 text-xs">·</span>
                    <span className="text-xs text-cream-400">
                      {update.brandNameCn}
                    </span>
                    <span className="text-cream-300 text-xs">·</span>
                    <CategoryBadge category={update.category} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg leading-snug text-cream-900 mb-1">
                    {update.title}
                  </h3>

                  {/* Expandable detail */}
                  <ExpandableCard
                    summary={update.summary}
                    contentHtml={update.contentHtml}
                  />

                  {/* Tags */}
                  {update.tags && update.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {update.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-cream-500 bg-cream-50 border border-cream-200 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  <div className="mt-4 pt-4 border-t border-cream-100">
                    <time className="text-xs text-cream-400" dateTime={update.date}>
                      {update.date}
                    </time>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </section>
    </>
  )
}
