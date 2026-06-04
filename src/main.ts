import { generator } from '@/generator'
import { compilerSfc } from './compiler'
import { scriptTransformer, templateTransformer } from './transformer'

export function sfc2esm(sfcSource: string, { id = 'sfc2esm', mount = '#app' }: Options = {}) {
  const appName = `__${id.replace(/[^a-z$]/gi, '')}_app__`
  const {
    isScoped,
    compiled: {
      sfcAppBlock,
      sfcStyleCompileResultsList,
      sfcTemplateCompileResults,
    },
  } = compilerSfc(sfcSource, id)
  const appCode = scriptTransformer(sfcAppBlock, appName)
  const renderCode = templateTransformer(sfcTemplateCompileResults, appName)
  const { initCode, scopeIdCode, createAppCode } = generator({ id, appName, isScoped, mount })
  return {
    esmCode: [initCode, appCode, renderCode, scopeIdCode, createAppCode].join('\n'),
    cssCode: sfcStyleCompileResultsList.map(style => style.code).join('\n'),
  }
}

export interface Options { id?: string, mount?: string }
