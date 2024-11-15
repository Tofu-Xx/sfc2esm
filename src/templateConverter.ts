import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { templateCompiler } from './compiler/templateCompiler'

export function templateConverter({ code }: SFCTemplateCompileResults, appName: string) {
  return code
    .replace('export function render', `${appName}.render = function`)
}
