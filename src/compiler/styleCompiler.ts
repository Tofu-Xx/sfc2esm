import { compileStyle, type SFCStyleBlock } from '@vue/compiler-sfc'
/**
 * 编译 SFC 的 <style>，生成可注入到页面的 CSS 结果。
 *
 * 基于 @vue/compiler-sfc 的 compileStyle，对单个样式块进行处理，
 * 支持 scoped 样式（自动注入作用域选择器）。
 *
 * 编译过程中产生的 errors 会通过 console.error 输出。
 *
 * @param style - SFC 样式块（包含内容、scoped 等信息）
 * @param id - 作用域唯一标识（用于 scoped CSS，例如 data-v-xxx）
 * @param filename - 文件名（用于错误提示与 source map）
 *
 * @returns 编译结果对象，包含处理后的 CSS、错误信息等
 */
export function styleCompiler(style: SFCStyleBlock, id: string, filename: string) {
  const sfcStyleCompileResults = compileStyle({
    id,
    filename,
    source: style.content,
    scoped: style.scoped,
  })
  sfcStyleCompileResults.errors.forEach(e => console.error(e))
  return sfcStyleCompileResults
}
