import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import { compileScript } from '@vue/compiler-sfc'

export function scriptCompiler(descriptor: SFCDescriptor, id: string) {
  const sfcScriptBlock: SFCScriptBlock = compileScript(descriptor, {
    id,
  })
  sfcScriptBlock.warnings?.forEach(w => console.warn(w))
  return sfcScriptBlock
}
