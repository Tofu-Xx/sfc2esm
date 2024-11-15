import type { SFCDescriptor } from '@vue/compiler-sfc'
import { compileTemplate } from '@vue/compiler-sfc'

export function templateCompiler(descriptor: SFCDescriptor, id: string, filename: string) {
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: descriptor.template?.content ?? '',
  })
  sfcTemplateCompileResults.errors.forEach(e => console.error(e))
  return sfcTemplateCompileResults
}
