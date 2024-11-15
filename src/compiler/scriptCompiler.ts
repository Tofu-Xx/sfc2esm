import type { Info, SFCAppBlock } from './types'
import { compileScript, type SFCDescriptor } from '@vue/compiler-sfc'

/*  */const __IS_DEV__ = false
export function scriptCompiler(descriptor: SFCDescriptor, info: Info) {
  const sfcAppBlock: SFCAppBlock = compileScript(descriptor, {
    id: info.id,
    isProd: !__IS_DEV__,
  })
  sfcAppBlock.isScoped = descriptor.styles.some(s => s.scoped)
  return sfcAppBlock
}
