import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { CompiledSFC } from './types'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'
import { scriptCompiler } from './scriptCompiler'
import { styleCompiler } from './styleCompiler'
import { templateCompiler } from './templateCompiler'

export function compilerSfc(source: string, id: string) {
  const filename = `${id}.vue`
  const { descriptor, errors } = parse(source, { filename })
  const isScoped = descriptor.styles.some(s => s.scoped)
  errors.forEach(e => console.warn(e))
  return {
    sfcAppBlock: scriptCompiler(descriptor, id),
    sfcTemplateCompileResults: templateCompiler(descriptor, id, filename),
    sfcStyleCompileResultsList: descriptor.styles.map(s => styleCompiler(s, id, filename)),
    isScoped,
  }
}
