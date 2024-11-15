import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { EsmCompilerArgs, Info } from './types'
import { compileTemplate } from '@vue/compiler-sfc'

/*  */const __IS_DEV__ = false
export function templateCompiler({ descriptor, info }: EsmCompilerArgs) {
  const sfcTemplateCompileResults = compileTemplate({
    ...info,
    source: descriptor.template?.content ?? '',
    isProd: !__IS_DEV__,
  })
  sfcTemplateCompileResults.errors.forEach(e => console.warn(e))
  return sfcTemplateCompileResults
}
