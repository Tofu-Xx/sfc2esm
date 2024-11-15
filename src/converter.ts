import { compilerSfc } from './compiler'
import { scriptCompiler } from './compiler/scriptCompiler'
import { styleCompiler } from './compiler/styleCompiler'
import { templateCompiler } from './compiler/templateCompiler'
import { sfcParse } from './sfcParse'
import { scriptTransformer } from './transformer/scriptTransformer'
import { stylesTransformer } from './transformer/stylesTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function converter(sfcSource: string, { id = 'sfc2esm', appName = id }: { id?: string, appName?: string } = {}) {
  const { isScoped, ...c } = compilerSfc(sfcSource, id)
  return {
    appCode: scriptTransformer(c.sfcAppBlock, appName),
    renderCode: templateTransformer(c.sfcTemplateCompileResults, appName),
    cssCode: stylesTransformer(c.sfcStyleCompileResultsList),
    isScoped,
  }
}
