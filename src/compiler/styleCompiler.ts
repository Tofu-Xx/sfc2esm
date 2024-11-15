import { compileStyle, type SFCStyleBlock } from '@vue/compiler-sfc'

export function styleCompiler(style: SFCStyleBlock, id: string, filename: string) {
  const sfcStyleCompileResults = compileStyle({
    id,
    filename,
    source: style.content,
    scoped: style.scoped,
  })
  sfcStyleCompileResults.errors.forEach(e => console.error(e))
  return sfcStyleCompileResults
}
