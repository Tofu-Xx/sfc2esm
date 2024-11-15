import type { SFCAppBlock } from '@/compiler/types'

export function scriptTransformer({ content }: SFCAppBlock, appName: string) {
  return content
    .replace('export default', `${appName} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}
