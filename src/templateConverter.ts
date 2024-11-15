import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { templateCompiler } from './compiler/templateCompiler'
import { converter } from './converter'
import { sfcParse } from './sfcParse'
import { closeTag } from './tools/toSfcCode'

export function templateConverter(templateSource: string, { id = 'sfc2esm', appName = id }: templateConverterOptions = {}) {
  const source = closeTag('<template>', templateSource)
  return converter(source, { id, appName }).renderCode
}
