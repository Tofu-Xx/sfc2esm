import { compilerSfc } from '@/compiler'
import { scriptTransformer, stylesTransformer, templateTransformer } from '@/transformer'
/**
 * 将 Vue SFC 源码转换为可在浏览器直接执行的代码片段。
 *
 * 该函数是 SFC 编译与转换流程的统一入口，负责：
 * 1. 调用 compilerSfc 解析并编译 SFC（script / template / style）
 * 2. 分别对编译结果进行转换（去除 ESM，适配全局运行时）
 * 3. 返回可直接注入到页面的代码字符串（JS + CSS）
 * 4. 提供简单缓存机制，避免重复编译
 *
 * 转换结果包括：
 * - app：组件对象定义（替换 export default）
 * - render：render 函数挂载代码
 * - css：合并后的样式字符串
 *
 * @param sfcSource - SFC 源码字符串（.vue 文件内容）
 * @param options - 配置项
 * @param options.id - 组件唯一标识（用于作用域隔离）
 * @param options.appName - 组件变量名（默认同 id）
 * @param options.cache - 编译缓存（key 为源码字符串）
 *
 * @returns 转换结果对象
 * @returns.code.app 组件定义代码
 * @returns.code.render render 函数代码
 * @returns.code.css 样式代码
 * @returns.isScoped 是否包含 scoped 样式
 *
 * @example
 * const result = convertor(source, { id: 'App' })
 *
 * // 注入执行
 * createDom('<script>', result.code.app + result.code.render)
 * createDom('<style>', result.code.css)
 */
export function convertor(sfcSource: string, { id = 'sfc2esm', appName = id, cache = {} }: Options = { }) {
  if (cache[sfcSource])
    return cache[sfcSource]
  const { isScoped, compiled: c } = compilerSfc(sfcSource, id)
  return {
    code: {
      app: scriptTransformer(c.sfcAppBlock, appName),
      render: templateTransformer(c.sfcTemplateCompileResults, appName),
      css: stylesTransformer(c.sfcStyleCompileResultsList),
    },
    isScoped,
  }
}

interface ConvertedResult {
  code: {
    app: string
    render: string
    css: string
  }
  isScoped: boolean
}
export interface Options {
  id?: string
  appName?: string
  cache?: Record<string, ConvertedResult>
}
