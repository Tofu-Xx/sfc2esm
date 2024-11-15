import { compilerSfc } from './compiler'
import { getRootTagName } from './tools/getRootTagName'
import { scriptTransformer } from './transformer/scriptTransformer'
import { stylesTransformer } from './transformer/stylesTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function convertor(sfcSource: string, { id = 'sfc2esm', appName = id }: { id?: string, appName?: string } = {}) {
  getRootTagName(sfcSource).includes('script') || (sfcSource = `<script>/* empty script */</script>${sfcSource}`)
  const { isScoped, ...c } = compilerSfc(sfcSource, id)
  return {
    appCode: scriptTransformer(c.sfcAppBlock, appName),
    renderCode: templateTransformer(c.sfcTemplateCompileResults, appName),
    cssCode: stylesTransformer(c.sfcStyleCompileResultsList),
    isScoped,
  }
}
