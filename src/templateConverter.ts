import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { templateCompiler } from './compiler/templateCompiler'
import { sfcParse } from './sfcParse'
import { toSfcCode } from './tools/toSfcCode'

export function templateConverter(templateSource: string, { id = 'sfc2esm', appName = id }: templateConverterOptions = {}) {
  const source = toSfcCode(templateSource, '<template>')
  const { code } = templateCompiler(sfcParse(source, id))
  return code
    .replace('export function render', `${appName}.render = function`)
}
