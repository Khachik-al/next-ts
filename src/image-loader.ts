import { ImageLoaderProps } from 'next/image'
export const exportableLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (process.env.NODE_ENV === 'development') {
    // This doesn't bother optimizing in the dev environment. Next complains if the
    // returned URL doesn't have a width in it, so adding it as a throwaway
    return `${src}?width=${width}`
  }
  // Generate a reasonably unique base folder. Doesn't have to be perfectly unique
  const [path, extension] = src.split(/\.([^.]*$)/) || []
  if (!path || !extension) {
    throw new Error(`Invalid path or no file extension: ${src}`)
  }
  // keep svgs as they are
  if (extension == 'svg') {
    return `${src}`
  }
  const filename = path.match(/([^\/]+)$/)?.[1] || ''
  const output = `/_optimized${path}/${filename}_${width}_${
    quality || 75
  }.${extension}`
  if (typeof window === 'undefined') {
    const json = { output, src, width, quality: quality || 75 }
    const fs = require('fs')
    const { join } = require('path')
    fs.appendFileSync(
      join(process.env.DIRNAME, '.next/custom-optimized-images.nd.json'),
      JSON.stringify(json) + '\n',
    )
  }
  return output
}
