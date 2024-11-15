import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'

export function templateTransformer({ code }: SFCTemplateCompileResults, appName: string) {
  return code
    .replace('export function render', `${appName}.render = function`)
}
