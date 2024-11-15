import { convertor } from '@/convertor'
import { generator } from '@/generator'

export interface Options { id?: string, appName?: string }
export function xxx2({ id = 'sfc2esm', appName = id }: Options = {}) {
  const cache = Object.create(null)
  const opt = { id, appName }
  const h = (tag: string, attrs: Record<string, boolean>, inner: string) => `<${tag} ${Object.keys(attrs).map(k => attrs[k] ? k : '').join(' ')}>${inner}</${tag}>`
  const a2b = (source: string, b: 'app' | 'render' | 'css') => convertor(source, { cache, ...opt }).code[b]
  return {
    scr2app: (scriptSource: string, setup = true) => a2b(h('script', { setup }, scriptSource), 'app'),
    tem2render: (templateSource: string) => a2b(h('template', {}, templateSource), 'render'),
    sty2css: (styleSource: string, scoped = false) => a2b(h('style', { scoped }, styleSource), 'css'),
    sfc2: (sfcSource: string, mount = '#app') => {
      const { isScoped, code: { app, render, css } } = convertor(sfcSource, { cache, ...opt })
      const { initCode, scopeIdCode, createAppCode } = generator({ ...opt, isScoped, mount })
      return {
        esm: [initCode, app, render, scopeIdCode, createAppCode].join('\n'),
        app,
        render,
        css,
      }
    },
  }
}
