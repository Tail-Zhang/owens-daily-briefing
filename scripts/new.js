const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve))
}

const categories = ['launch', 'campaign', 'collaboration', 'retail', 'trend', 'other']

async function main() {
  console.log('\n=== Owen\'s Daily Briefing — 新建条目 ===\n')

  const brandNameEn = await ask('品牌英文名 (e.g. Jo Malone London): ')
  const brandNameCn = await ask('品牌中文名 (e.g. 祖·玛珑): ')
  const title = await ask('标题: ')
  const summary = await ask('摘要 (1-2句): ')
  const date = await ask(`日期 (默认今天 ${today()}): `) || today()
  console.log(`\n分类: ${categories.map((c, i) => `${i + 1}.${c}`).join(' ')}`)
  const catIdx = await ask('选分类序号 (1-6): ')
  const category = categories[parseInt(catIdx) - 1] || 'other'
  const tagsRaw = await ask('标签 (逗号分隔, e.g. 限量,春季,樱花): ')
  const tags = tagsRaw ? tagsRaw.split(/[,，]/).map((t) => t.trim()).filter(Boolean) : []
  const image = await ask('图片路径 (e.g. /images/xxx.jpg, 可留空): ') || ''

  // Generate slug
  const slug = `${date}-${brandNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

  // Build frontmatter
  const fm = [
    '---',
    `slug: "${slug}"`,
    `brandNameEn: "${brandNameEn}"`,
    `brandNameCn: "${brandNameCn}"`,
    `title: "${title}"`,
    `summary: "${summary}"`,
    `date: "${date}"`,
    `category: "${category}"`,
    `image: "${image}"`,
    `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`,
    `featured: false`,
    '---',
    '',
    `# ${title}`,
    '',
    '在这里撰写详细内容...',
    '',
  ].join('\n')

  const filePath = path.join(process.cwd(), 'content/updates', `${slug}.mdx`)
  fs.writeFileSync(filePath, fm, 'utf-8')

  console.log(`\n✓ 已创建: content/updates/${slug}.mdx`)
  console.log('  用编辑器打开编辑正文，然后 git push 即可上线。\n')

  rl.close()
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

main()
