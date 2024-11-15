import type { SFCAppBlock } from '@/compiler/types'
import { generator } from '@/generator'
import { parse, type SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { scriptCompiler } from './compiler/scriptCompiler'
import { templateCompiler } from './compiler/templateCompiler'
import { scriptConverter } from './scriptConverter'
import { templateConverter } from './templateConverter'
import { scriptTransformer } from './transformer/scriptTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function sfcParse(source: string, id: string) {
  const info = { id, filename: `${id}.vue` }
  const { descriptor, errors } = parse(source, { filename: info.filename })
  errors.forEach(e => console.warn(e))
  return { descriptor, info }
}

export function sfcConverter(source: string, id = 'sfc2esm', appName = id) {
  const { descriptor, info } = sfcParse(source, id)
  const sfcAppBlock = scriptCompiler(descriptor, info)
  const sfcTemplateCompileResults = templateCompiler(descriptor.template, info)
  const isScoped = descriptor.styles.some(s => s.scoped)
  const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped })
  return [
    initCode,
    scriptTransformer(sfcAppBlock, appName),
    templateTransformer(sfcTemplateCompileResults, appName),
    scopeIdCode,
    createAppCode,
  ].join('\n')
}
