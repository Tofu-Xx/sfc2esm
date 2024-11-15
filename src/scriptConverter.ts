import type { SFCAppBlock } from '@/compiler/types'
import { APP_VAR_NAME } from '@/data'

export function scriptConverter({ content }: SFCAppBlock) {
  return content
    .replace('export default', `${APP_VAR_NAME} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}

/* const source = toSfcCode(scriptSource, opt.setup ? '<script setup>' : '<script>')
  const { sfcAppBlock: { content } } = compilerSfc(source, opt.id) */
