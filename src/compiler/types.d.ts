import type { SFCDescriptor, SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'

export interface CompiledSFC {
  sfcStyleCompileResultsList: SFCStyleCompileResults[]
  sfcAppBlock: SFCAppBlock
  sfcTemplateCompileResults: SFCTemplateCompileResults
}
export interface Info {
  id: string
  filename: string
}
export interface EsmCompilerArgs {
  descriptor: SFCDescriptor
  info: Info
}
