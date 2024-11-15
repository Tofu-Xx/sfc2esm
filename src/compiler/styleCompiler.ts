import { compileStyle, type SFCStyleBlock } from '@vue/compiler-sfc'

// /*  */const __IS_DEV__ = false
export function styleCompiler(style: SFCStyleBlock, id: string, filename: string) {
  const sfcStyleCompileResults = compileStyle({
    id,
    filename,
    source: style.content,
    scoped: style.scoped,
    isProd: !__IS_DEV__,
  })
  sfcStyleCompileResults.errors.forEach(e => console.error(e))
  return sfcStyleCompileResults
}
