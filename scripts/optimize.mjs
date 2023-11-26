import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import Jimp from 'jimp'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
async function optimize() {
  const outPath = 'out'
  const items = (
    await fs.readFile(
      path.join(__dirname, '../.next/custom-optimized-images.nd.json'),
      'utf-8',
    )
  )
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line))
  await Promise.all(
    items.map(async (item) => {
      const srcPath = path.join(__dirname, '../', outPath, item.src)
      const destPath = path.join(__dirname, '../', outPath, item.output)
      console.log({ srcPath, destPath })
      const img = await Jimp.read(srcPath)
      await img.resize(item.width, Jimp.AUTO)
      await img.quality(item.quality)
      await img.writeAsync(destPath)
    }),
  )
}

optimize()