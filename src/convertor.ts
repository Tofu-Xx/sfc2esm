import { compilerSfc } from '@/compiler'
import { scriptTransformer, stylesTransformer, templateTransformer } from '@/transformer'

// const
export interface Options {
  id?: string
  appName?: string
  cache: Record<string, any>
}
export function convertor(sfcSource: string, { id = 'sfc2esm', appName = id, cache }: Options = { cache: {} }) {
  if (cache[sfcSource])
    return cache[sfcSource]
  const { isScoped, ...c } = compilerSfc(sfcSource, id)
  return cache[sfcSource] = {
    appCode: scriptTransformer(c.sfcAppBlock, appName),
    renderCode: templateTransformer(c.sfcTemplateCompileResults, appName),
    cssCode: stylesTransformer(c.sfcStyleCompileResultsList),
    isScoped,
  }
}
