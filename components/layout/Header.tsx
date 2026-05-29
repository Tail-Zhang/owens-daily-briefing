import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream-50/80 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-wide text-cream-900 hover:text-sage-600 transition-colors">
          Owen's Daily Briefing
        </Link>
        <nav className="flex gap-6 text-sm text-cream-700">
          <Link href="/" className="hover:text-cream-900 transition-colors">
            Home
          </Link>
          <Link href="/" className="hover:text-cream-900 transition-colors">
            Brands
          </Link>
        </nav>
      </div>
    </header>
  )
}
