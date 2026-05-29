import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Owen's Daily Briefing | 香水品牌日报",
    template: "%s | Owen's Daily Briefing",
  },
  description:
    '每日更新全球香水品牌最新资讯、营销案例与品牌故事。',
  keywords: ['perfume', 'marketing', '香水', '品牌营销', 'fragrance'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: "Owen's Daily Briefing",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
