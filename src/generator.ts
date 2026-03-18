/**
 * 生成用于运行 SFC 组件的初始化与挂载代码。
 *
 * 该函数负责构建浏览器端执行所需的代码片段，包括：
 * 1. 初始化组件变量（appName）
 * 2. 创建并挂载 Vue 应用实例（createApp）
 * 3. 注入 scoped 样式标识（若存在）
 * 4. 自动处理 async setup（通过 Suspense 包装）
 *
 * 生成的代码通常会与 transform 阶段产物拼接后，通过 <script type="module"> 注入执行。
 *
 * @param options - 生成配置
 * @param options.id - 组件唯一标识（用于 scoped CSS）
 * @param options.appName - 组件变量名（全局挂载对象）
 * @param options.isScoped - 是否启用 scoped 样式
 * @param options.mount - 挂载点选择器（如 "#app"）
 *
 * @returns 代码片段对象
 * @returns.initCode 初始化组件变量代码（如：let App = {}）
 * @returns.createAppCode Vue 应用创建与挂载代码
 * @returns.scopeIdCode scoped 样式标记注入代码
 *
 * @example
 * const code = generator({
 *   id: 'abc',
 *   appName: 'App',
 *   isScoped: true,
 *   mount: '#app'
 * })
 *
 * // 生成：
 * // let App = {}
 * // App.__scopeId = "data-v-abc"
 * // createApp(...).mount('#app')
 */
export function generator(options: generatorOptions): {
  initCode: string
  createAppCode: string
  scopeIdCode: string
}
export function generator({ id, appName, isScoped, mount }: generatorOptions) {
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
export interface generatorOptions {
  id: string
  appName: string
  isScoped: boolean
  mount: string
}
