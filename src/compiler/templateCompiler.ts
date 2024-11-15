import type { SFCDescriptor } from '@vue/compiler-sfc'
import { compileTemplate } from '@vue/compiler-sfc'

/*  */const __IS_DEV__ = false
export function templateCompiler(descriptor: SFCDescriptor, id: string, filename: string) {
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: descriptor.template?.content ?? '',
    isProd: !__IS_DEV__,
  })
  sfcTemplateCompileResults.errors.forEach(e => console.error(e))
  return sfcTemplateCompileResults
}
