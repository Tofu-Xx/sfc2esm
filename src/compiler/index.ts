import { parse } from '@vue/compiler-sfc'
import { scriptCompiler } from './scriptCompiler'
import { styleCompiler } from './styleCompiler'
import { templateCompiler } from './templateCompiler'

export function compilerSfc(source: string, id: string) {
  const filename = `${id}.vue`
  const { descriptor, errors } = parse(source, { filename })
  if (!descriptor.script && !descriptor.scriptSetup) {
    return compilerSfc(`<script>/* empty script */</script>${source}`, id)
  }
  const isScoped = descriptor.styles.some(s => s.scoped)
  errors.forEach(e => console.error(e))
  return {
    compiled: {
      sfcAppBlock: scriptCompiler(descriptor, id),
      sfcTemplateCompileResults: templateCompiler(descriptor, id, filename),
      sfcStyleCompileResultsList: descriptor.styles.map(s => styleCompiler(s, id, filename)),
    },
    isScoped,
  }
}
