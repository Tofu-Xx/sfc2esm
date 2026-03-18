import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import { compileScript } from '@vue/compiler-sfc'
/**
 * 编译 SFC 的 <script>（包括 <script setup>），生成标准化的脚本块。
 *
 * 基于 @vue/compiler-sfc 的 compileScript，对 SFCDescriptor 进行处理，
 * 将 <script> 与 <script setup> 合并并转换为可执行的脚本描述结构。
 *
 * 编译过程中产生的 warnings 会通过 console.warn 输出。
 *
 * @param descriptor - SFC 描述对象（由 parse 生成），包含 template / script / style 等信息
 * @param id - 当前组件的唯一标识，用于作用域隔离（例如 CSS scope / HMR 标识）
 *
 * @returns 编译后的脚本块（SFCScriptBlock），包含处理后的代码与元信息
 */
export function scriptCompiler(descriptor: SFCDescriptor, id: string) {
  const sfcScriptBlock: SFCScriptBlock = compileScript(descriptor, { id })
  sfcScriptBlock.warnings?.forEach(w => console.warn(w))
  return sfcScriptBlock
}
