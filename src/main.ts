import { sfcCode } from '../tmp/css-scoped.html'
import { converter } from './converter'
import { generator } from './generator'
import { h } from './tools/h'

export interface Options { id?: string, appName?: string }
export default ({ id = 'sfc2esm', appName = id }: Options = {}) => {
  const x2x = (tag: string, attrs: Record<string, boolean>, inner: string, returned: keyof ReturnType<typeof converter>) => converter(h(tag, attrs, inner), { id, appName })[returned]
  return {
    sfc2esm: (sfcSource: string, mount = '#app') => {
      const { isScoped, appCode, renderCode } = converter(sfcSource, { id, appName })
      const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped, mount })
      return [
        initCode,
        appCode,
        renderCode,
        scopeIdCode,
        createAppCode,
      ].join('\n')
    },
    script2app: (scriptSource: string, setup = true) => x2x('script', { setup }, scriptSource, 'appCode'),
    template2render: (templateSource: string) => x2x('template', {}, templateSource, 'renderCode'),
    style2css: (styleSource: string, scoped = false) => x2x('style', { scoped }, styleSource, 'cssCode'),
  }
}

// console.log(esmConverter(sfcCode))
// console.log(
//   scriptConverter(`
//     import { ref } from 'vue';
//     const count = ref(0);`,
//   ),
// )
// console.log(
//   templateConverter(`
//     <button @click="count++">{{ count }}</button>
//   `),
// )
// console.log(
//   styleConverter(`
//     @import "https://unpkg.com/@tofukit/resetcss";

//     button {
//       margin: auto;
//     }
//   `, { isScoped: true }),
// )
