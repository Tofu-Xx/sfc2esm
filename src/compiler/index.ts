import { parse } from '@vue/compiler-sfc'
import { scriptCompiler } from './scriptCompiler'
import { styleCompiler } from './styleCompiler'
import { templateCompiler } from './templateCompiler'
/**
 * 编译单文件组件（SFC）的完整入口函数。
 * 负责将 SFC 源码解析并分别交由 script / template / style 编译器处理，
 * 最终返回统一的编译结果结构。
 *
 * 内部流程：
 * 1. 使用 parse 解析 SFC 字符串为 descriptor
 * 2. 若缺少 <script>，自动注入空 script（保证 compileScript 可执行）
 * 3. 分别编译：
 *    - script → 组件逻辑（含 setup 转换）
 *    - template → render 函数
 *    - style → CSS（含 scoped 处理）
 * 4. 汇总编译结果并返回
 *
 * 同时会输出 parse 阶段的错误信息到 console.error。
 *
 * @param source - SFC 源码字符串（.vue 文件内容）
 * @param id - 组件唯一标识（用于作用域隔离，如 scoped CSS / HMR）
 *
 * @returns 编译结果对象
 * @returns.compiled 各模块编译结果集合
 * @returns.compiled.sfcAppBlock script 编译结果
 * @returns.compiled.sfcTemplateCompileResults template 编译结果
 * @returns.compiled.sfcStyleCompileResultsList style 编译结果列表
 * @returns.isScoped 是否存在 scoped 样式
 */
export function compilerSfc(source: string, id: string) {
  const filename = `${id}.vue`
  const { descriptor, errors } = parse(source, { filename })
  if (!descriptor.script && !descriptor.scriptSetup) {
    return compilerSfc(`<script>/* empty script */</script>${source}`, id)
  }
  const isScoped = descriptor.styles.some(s => s.scoped)
  errors.forEach(e => console.error(e))
  return {
    compiled: {
      sfcAppBlock: scriptCompiler(descriptor, id),
      sfcTemplateCompileResults: templateCompiler(descriptor, id, filename),
      sfcStyleCompileResultsList: descriptor.styles.map(s => styleCompiler(s, id, filename)),
    },
    isScoped,
  }
}
