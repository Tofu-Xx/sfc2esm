import type { SFCStyleCompileResults } from '@vue/compiler-sfc'

export function stylesTransformer(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}
