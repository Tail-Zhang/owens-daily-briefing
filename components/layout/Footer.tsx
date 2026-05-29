export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-cream-500">
        <p>Owen's Daily Briefing &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">每日更新全球香水品牌最新资讯</p>
      </div>
    </footer>
  )
}
