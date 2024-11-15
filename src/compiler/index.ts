import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { CompiledSFC, SFCAppBlock } from './types'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'
import { scriptCompiler } from './scriptCompiler'
import { styleCompiler } from './styleCompiler'
import { templateCompiler } from './templateCompiler'

export function compilerSfc(source: string, id: string): CompiledSFC {
  const info = { id, filename: `${id}.vue` }
  const { descriptor, errors } = parse(source, { filename: info.filename })
  errors.forEach(e => console.warn(e))
  return {
    sfcAppBlock: scriptCompiler(descriptor, info),
    sfcTemplateCompileResults: templateCompiler(descriptor.template, info),
    sfcStyleCompileResultsList: descriptor.styles.map(s => styleCompiler(s, info)),
  }
}
