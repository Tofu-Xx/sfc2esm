import { convertor } from '@/convertor'
import { generator } from '@/generator'
import { h } from '@/tools'

export interface Options { id?: string, appName?: string }
export function createConvertor({ id = 'sfc2esm', appName = id }: Options = {}) {
  const opt = { id, appName }
  const a2b = (source: string, b: 'appCode' | 'renderCode' | 'cssCode') => convertor(source, opt)[b]
  return {
    script2app: (scriptSource: string, setup = true) => a2b(h('script', { setup }, scriptSource), 'appCode'),
    template2render: (templateSource: string) => a2b(h('template', {}, templateSource), 'renderCode'),
    style2css: (styleSource: string, scoped = false) => a2b(h('style', { scoped }, styleSource), 'cssCode'),
    sfc2app: (sfcSource: string) => a2b(sfcSource, 'appCode'),
    sfc2render: (sfcSource: string) => a2b(sfcSource, 'renderCode'),
    sfc2css: (sfcSource: string) => a2b(sfcSource, 'cssCode'),
    sfc2esm: (sfcSource: string, mount = '#app') => {
      const { isScoped, appCode, renderCode } = convertor(sfcSource, opt)
      const { initCode, createAppCode, scopeIdCode } = generator({ ...opt, isScoped, mount })
      return [initCode, appCode, renderCode, scopeIdCode, createAppCode].join('\n')
    },
  }
}
