import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import type { EsmCompilerArgs, Info } from './types'
import { compileScript } from '@vue/compiler-sfc'

/*  */const __IS_DEV__ = false

export function scriptCompiler({ descriptor, info }: EsmCompilerArgs) {
  const sfcScriptBlock: SFCScriptBlock = compileScript(descriptor, {
    id: info.id,
    isProd: !__IS_DEV__,
  })
  // sfcAppBlock.isScoped = descriptor.styles.some(s => s.scoped)
  return sfcScriptBlock
}
