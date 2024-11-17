import { compilerSfc } from '@/compiler'
import { scriptTransformer, stylesTransformer, templateTransformer } from '@/transformer'

// const
export interface Options {
  id?: string
  appName?: string
  cache?: Record<string, ConvertedResult>
}
interface ConvertedResult {
  code: {
    app: string
    render: string
    css: string
  }
  isScoped: boolean
}
export function convertor(sfcSource: string, { id = 'sfc2esm', appName = id, cache = {} }: Options = { }) {
  if (cache[sfcSource])
    return cache[sfcSource]
  const { isScoped, compiled: c } = compilerSfc(sfcSource, id)
  return {
    code: {
      app: scriptTransformer(c.sfcAppBlock, appName),
      render: templateTransformer(c.sfcTemplateCompileResults, appName),
      css: stylesTransformer(c.sfcStyleCompileResultsList),
    },
    isScoped,
  }
}
