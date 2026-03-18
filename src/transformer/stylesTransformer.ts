import type { SFCStyleCompileResults } from '@vue/compiler-sfc'
/**
 * 合并多个 SFC 样式编译结果，生成最终的 CSS 字符串。
 *
 * 将 compileStyle 返回的多个样式块（可能来自多个 <style> 标签）
 * 提取其 code 并按顺序拼接，用于最终注入到 <style> 标签中。
 *
 * @param sfcStyleCompileResultsList - 样式编译结果列表
 *
 * @returns 合并后的 CSS 字符串
 *
 * @example
 * // 原始：
 * [
 *   { code: ".a { color: red; }" },
 *   { code: ".b { color: blue; }" }
 * ]
 *
 * // 转换后：
 * ".a { color: red; }\n.b { color: blue; }"
 */
export function stylesTransformer(sfcStyleCompileResultsList: SFCStyleCompileResults[]) {
  return sfcStyleCompileResultsList.map(style => style.code).join('\n')
}
