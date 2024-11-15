import { generator } from '@/generator'
import { parse, type SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { scriptCompiler } from './compiler/scriptCompiler'
import { styleCompiler } from './compiler/styleCompiler'
import { templateCompiler } from './compiler/templateCompiler'
import { converter } from './converter'
import { scriptConverter } from './scriptConverter'
import { sfcParse } from './sfcParse'
import { templateConverter } from './templateConverter'
import { scriptTransformer } from './transformer/scriptTransformer'
import { stylesTransformer } from './transformer/stylesTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function esmConverter(sfcSource: string, { id = 'sfc2esm', appName = id, mount = '#app' }: SfcConverterOptions = {}) {
  const { isScoped, appCode, renderCode } = converter(sfcSource, { id, appName })
  const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped, mount })
  return [
    initCode,
    appCode,
    renderCode,
    scopeIdCode,
    createAppCode,
  ].join('\n')
}
