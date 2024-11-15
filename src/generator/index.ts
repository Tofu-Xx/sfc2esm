export interface generatorOptions {
  id: string
  appName?: string
  isScoped?: boolean
}
export function generator({ id, appName = id, isScoped = false }: generatorOptions) {
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
      )).mount(document.body)
    ` as const,
    scopeIdCode: isScoped ? (`${appName}.__scopeId = "data-v-${id}"` as const) : '' as const,
  }
}
