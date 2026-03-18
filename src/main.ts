import { generator } from '@/generator'
import { compilerSfc } from './compiler'
import { scriptTransformer, stylesTransformer, templateTransformer } from './transformer'

export function sfc2esm(sfcSource: string, { id = 'sfc2esm', appName = id, mount = '#app' }: Options) {
  const { isScoped, compiled: c } = compilerSfc(sfcSource, id)
  const appCode = scriptTransformer(c.sfcAppBlock, appName)
  const renderCode = templateTransformer(c.sfcTemplateCompileResults, appName)
  const cssCode = stylesTransformer(c.sfcStyleCompileResultsList)
  const { initCode, scopeIdCode, createAppCode } = generator({ id, appName, isScoped, mount })
  return {
    esmCode: [initCode, appCode, renderCode, scopeIdCode, createAppCode].join('\n'),
    cssCode,
  }
}

export interface Options { id?: string, appName?: string, mount?: string }
