import type { Info } from './types'
import { compileStyle, type SFCStyleBlock } from '@vue/compiler-sfc'

/*  */const __IS_DEV__ = false
export function styleCompiler(style: SFCStyleBlock, info: Info) {
  const sfcStyleCompileResults = compileStyle({
    ...info,
    source: style.content,
    scoped: style.scoped,
    isProd: !__IS_DEV__,
  })
  sfcStyleCompileResults.errors.forEach(e => console.warn(e))
  return sfcStyleCompileResults
}
