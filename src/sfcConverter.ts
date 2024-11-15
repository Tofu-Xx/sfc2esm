import { generator } from '@/generator'
import { parse, type SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { scriptCompiler } from './compiler/scriptCompiler'
import { templateCompiler } from './compiler/templateCompiler'
import { scriptConverter } from './scriptConverter'
import { sfcParse } from './sfcParse'
import { templateConverter } from './templateConverter'
import { scriptTransformer } from './transformer/scriptTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function sfcConverter(source: string, { id = 'sfc2esm', appName = id, mount = '#app' }: SfcConverterOptions = {}) {
  const { descriptor, info } = sfcParse(source, id)
  const sfcAppBlock = scriptCompiler({ descriptor, info })
  const sfcTemplateCompileResults = templateCompiler({ descriptor, info })
  const isScoped = descriptor.styles.some(s => s.scoped)
  const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped, mount })
  return [
    initCode,
    scriptTransformer(sfcAppBlock, appName),
    templateTransformer(sfcTemplateCompileResults, appName),
    scopeIdCode,
    createAppCode,
  ].join('\n')
}
