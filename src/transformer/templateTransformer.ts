import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { APP_VAR_NAME } from '@/data'

export function templateTransformer({ code }: SFCTemplateCompileResults) {
  return code
    .replace('export function render', `${APP_VAR_NAME}.render = function`)
}
