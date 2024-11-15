import { compilerSfc } from '@/compiler'
import { getRootTagName } from '@/tools'
import { scriptTransformer, stylesTransformer, templateTransformer } from '@/transformer'

const cache = Object.create(null)
export function convertor(sfcSource: string, { id = 'sfc2esm', appName = id }: { id?: string, appName?: string } = {}) {
  if (cache[sfcSource])
    return cache[sfcSource]
  getRootTagName(sfcSource).includes('script') || (sfcSource = `<script>/* empty script */</script>${sfcSource}`)
  const { isScoped, ...c } = compilerSfc(sfcSource, id)
  return cache[sfcSource] = {
    appCode: scriptTransformer(c.sfcAppBlock, appName),
    renderCode: templateTransformer(c.sfcTemplateCompileResults, appName),
    cssCode: stylesTransformer(c.sfcStyleCompileResultsList),
    isScoped,
  }
}
