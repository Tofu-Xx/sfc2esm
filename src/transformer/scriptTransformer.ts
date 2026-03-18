import type { SFCScriptBlock } from '@vue/compiler-sfc'
/**
 * 转换 SFC script 编译结果，使其适配运行时执行环境。
 * 主要用于将 compileScript 生成的标准模块代码，转换为
 * 可直接在浏览器中执行并挂载到全局变量的形式。
 *
 * 转换内容包括：
 * 1. 将 `export default` 替换为指定变量赋值（用于组件实例挂载）
 * 2. 移除 compileScript 生成的 __returned__ 相关 defineProperty 代码（对__returned__ 的附加信息对运行时环境是无用甚至有害的）
 *
 * @param { content } - 编译后的 SFC script 块（包含 JS 代码）
 * @param appName - 挂载组件的变量名（例如 "App"）
 *
 * @returns 转换后的 JavaScript 代码字符串
 *
 * @example
 * // 原始（compileScript 输出简化）：
 * export default {
 *   setup(__props) {
 *     const count = 1
 *     const __returned__ = { count }
 *     Object.defineProperty(__returned__, '__isScriptSetup', { value: true })
 *     return __returned__
 *   }
 * }
 *
 * // 转换后：
 * App = {
 *   setup(__props) {
 *     const count = 1
 *     const __returned__ = { count }
 *     return __returned__
 *   }
 * }
 */
export function scriptTransformer({ content }: SFCScriptBlock, appName: string) {
  return content
    .replace('export default', `${appName} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
}
