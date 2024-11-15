import { generator } from '@/generator'
import { converter } from './converter'

export function esmConverter(sfcSource: string, { id = 'sfc2esm', appName = id, mount = '#app' }: SfcConverterOptions = {}) {
  const { isScoped, appCode, renderCode } = converter(sfcSource, { id, appName })
  const { initCode, createAppCode, scopeIdCode } = generator({ id, appName, isScoped, mount })
  return [
    initCode,
    appCode,
    renderCode,
    scopeIdCode,
    createAppCode,
  ].join('\n')
}
