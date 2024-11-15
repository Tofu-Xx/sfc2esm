import type { SFCAppBlock } from '@/compiler/types'

export function scriptConverter({ content }: SFCAppBlock, appName: string) {
  return content
    .replace('export default', `${appName} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}

/* const source = toSfcCode(scriptSource, opt.setup ? '<script setup>' : '<script>')
  const { sfcAppBlock: { content } } = compilerSfc(source, opt.id) */
