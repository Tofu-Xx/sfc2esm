import { convertor } from '@/convertor'
import { generator } from '@/generator'
import { h } from '@/tools'

export interface Options { id?: string, appName?: string }
export function createConvertor({ id = 'sfc2esm', appName = id }: Options = {}) {
  type TagInfo = [string, Record<string, boolean>, string]
  type CodeType = 'appCode' | 'renderCode' | 'cssCode'
  const x2x = (c: CodeType, ...t: TagInfo) => convertor(h(...t), { id, appName })[c]
  return {
    script2app: (scriptSource: string, setup = true) => x2x('appCode', 'script', { setup }, scriptSource),
    template2render: (templateSource: string) => x2x('renderCode', 'template', {}, templateSource),
    style2css: (styleSource: string, scoped = false) => x2x('cssCode', 'style', { scoped }, styleSource),
    sfc2esm: (sfcSource: string, mount = '#app') => {
      const { isScoped, appCode, renderCode } = convertor(sfcSource, { id, appName })
      const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped, mount })
      return [initCode, appCode, renderCode, scopeIdCode, createAppCode].join('\n')
    },
  }
}
