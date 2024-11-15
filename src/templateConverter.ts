import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { APP_VAR_NAME } from '@/data'
import { templateCompiler } from './compiler/templateCompiler'

export function templateConverter({ code }: SFCTemplateCompileResults) {
  return code
    .replace('export function render', `${APP_VAR_NAME}.render = function`)
}
