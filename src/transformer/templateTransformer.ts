import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
/**
 * 转换 SFC template 编译结果，使其挂载到组件对象上。
 *
 * 将 compileTemplate 生成的 render 函数（ESM 导出形式）
 * 转换为直接赋值到组件实例上的方法（全局运行时模式）。
 *
 * 转换内容：
 * 1. 将 `export function render` 替换为 `${appName}.render = function`
 *
 * @param { code } - 模板编译结果（包含 render 函数字符串）
 * @param appName - 组件变量名（用于挂载 render，例如 "App"）
 *
 * @returns 转换后的 JavaScript 代码字符串
 *
 * @example
 * // 原始：
 * export function render() {}
 *
 * // 转换后：
 * App.render = function() {}
 */
export function templateTransformer({ code }: SFCTemplateCompileResults, appName: string) {
  return code
    .replace('export function render', `${appName}.render = function`)
}
