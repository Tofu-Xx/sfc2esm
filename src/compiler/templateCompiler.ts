import type { SFCDescriptor } from '@vue/compiler-sfc'
import { compileTemplate } from '@vue/compiler-sfc'
/**
 * 编译 SFC 的 <template>，生成渲染函数代码。
 *
 * 基于 @vue/compiler-sfc 的 compileTemplate，将模板内容转换为
 * 可执行的 render 函数（字符串形式的 JS 代码）。
 *
 * 编译过程中产生的 errors 会通过 console.error 输出。
 *
 * @param descriptor - SFC 描述对象（包含 template / script / style 等）
 * @param id - 作用域唯一标识（用于 scoped CSS / 组件隔离）
 * @param filename - 文件名（用于错误提示与调试信息）
 *
 * @returns 编译结果对象，包含 render 函数代码、错误信息等
 */
export function templateCompiler(descriptor: SFCDescriptor, id: string, filename: string) {
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: descriptor.template?.content ?? '',
  })
  sfcTemplateCompileResults.errors.forEach(e => console.error(e))
  return sfcTemplateCompileResults
}
