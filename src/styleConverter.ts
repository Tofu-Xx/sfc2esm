import { converter } from './converter'
import { closeTag } from './tools/toSfcCode'

export function styleConverter(styleSource: string, { id = 'sfc2esm', appName = id, isScoped = false }: { id?: string, appName?: string, isScoped?: boolean } = {}) {
  const source = closeTag(`<style${isScoped ? ' scoped' : ''}>`, styleSource)
  return converter(source, { id, appName }).cssCode
}
