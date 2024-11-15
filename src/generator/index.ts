export interface generatorOptions {
  id: string
  appName?: string
  isScoped?: boolean
  mount?: string
}
export function generator({ id, appName = id, isScoped = false, mount = '#app' }: generatorOptions) {
  return {
    initCode: `let ${appName} = {}` as const,
    createAppCode: `
      import { createApp as _createApp, defineComponent as _defineComponent, h as _h, Suspense as _Suspense } from 'vue'
      _createApp(_defineComponent(
        String(${appName}.setup).startsWith('async')
        ? () => () => _h(_Suspense, null, { 
          default: _h(${appName}),
          fallback: _h('div', 'Loading...'),
        })
        : ${appName}
      )).mount("${mount}")
    ` as const,
    scopeIdCode: isScoped ? (`${appName}.__scopeId = "data-v-${id}"` as const) : '' as const,
  }
}
