import type { SFCScriptBlock } from '@vue/compiler-sfc'

export function scriptTransformer({ content }: SFCScriptBlock, appName: string) {
  return content
    .replace('export default', `${appName} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}
