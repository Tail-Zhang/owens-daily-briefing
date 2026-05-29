export interface BrandUpdate {
  slug: string
  brandNameEn: string
  brandNameCn: string
  title: string
  summary: string
  date: string
  category: 'launch' | 'campaign' | 'collaboration' | 'retail' | 'trend' | 'other'
  image: string
  tags?: string[]
  featured?: boolean
  content: string
}

export const categoryLabels: Record<BrandUpdate['category'], string> = {
  launch: '新品发布',
  campaign: '营销战役',
  collaboration: '品牌联名',
  retail: '零售动态',
  trend: '行业趋势',
  other: '其他',
}
