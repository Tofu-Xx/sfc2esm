import { scriptCompiler } from './compiler/scriptCompiler'
import { converter } from './converter'
import { sfcParse } from './sfcParse'
import { closeTag } from './tools/toSfcCode'

export function scriptConverter(scriptSource: string, { id = 'sfc2esm', appName = id, setup = true }: ScriptConverterOptions = {}) {
  const source = closeTag(`<script${setup ? ' setup' : ''}>`, scriptSource)
  return converter(source, { id, appName }).appCode
}
