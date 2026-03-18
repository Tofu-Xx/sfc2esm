import { generator } from '@/generator'
import { compilerSfc } from './compiler'
import { scriptTransformer, templateTransformer } from './transformer'

export function sfc2esm(sfcSource: string, { id = 'sfc2esm', appName = id, mount = '#app' }: Options) {
  const { isScoped, compiled: c } = compilerSfc(sfcSource, id)
  const appCode = scriptTransformer(c.sfcAppBlock, appName)
  const renderCode = templateTransformer(c.sfcTemplateCompileResults, appName)
  const { initCode, scopeIdCode, createAppCode } = generator({ id, appName, isScoped, mount })
  return {
    esmCode: [initCode, appCode, renderCode, scopeIdCode, createAppCode].join('\n'),
    cssCode: c.sfcStyleCompileResultsList.map(style => style.code).join('\n'),
  }
}

export interface Options { id?: string, appName?: string, mount?: string }
