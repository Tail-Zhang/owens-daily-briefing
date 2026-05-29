import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BrandUpdate } from './types'

const updatesDir = path.join(process.cwd(), 'content/updates')

export async function getAllUpdates(): Promise<BrandUpdate[]> {
  if (!fs.existsSync(updatesDir)) return []

  const filenames = fs.readdirSync(updatesDir)

  const updates = filenames
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((filename) => {
      const filePath = path.join(updatesDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      return { ...data, content } as BrandUpdate
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  return updates
}

export async function getUpdate(slug: string): Promise<BrandUpdate | null> {
  const filePath = path.join(updatesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { ...data, content } as BrandUpdate
}
