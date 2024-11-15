import type { SFCAppBlock } from '@/compiler/types'
import { APP_VAR_NAME } from '@/data'

export function scriptTransformer({ content }: SFCAppBlock) {
  return content
    .replace('export default', `${APP_VAR_NAME} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}
