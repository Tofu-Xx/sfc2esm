import { scriptCompiler } from './compiler/scriptCompiler'
import { sfcParse } from './sfcParse'
import { toSfcCode } from './tools/toSfcCode'

export function scriptConverter(scriptSource: string, { id = 'sfc2esm', appName = id, setup = true }: ScriptConverterOptions = {}) {
  const source = toSfcCode(scriptSource, `<script${setup ? ' setup' : ''}>`)
  const { content } = scriptCompiler(sfcParse(source, id))
  return content
    .replace('export default', `${appName} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}

/* const source = toSfcCode(scriptSource, opt.setup ? '<script setup>' : '<script>')
  const { sfcAppBlock: { content } } = compilerSfc(source, opt.id) */
