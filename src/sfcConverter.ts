import type { SFCAppBlock } from '@/compiler/types'
import { APP_VAR_NAME, CREATE_APP_CODE, INIT_CODE, SCOPED_ID_CODE } from '@/data'
import { parse, type SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { scriptCompiler } from './compiler/scriptCompiler'
import { templateCompiler } from './compiler/templateCompiler'
import { scriptConverter } from './scriptConverter'
import { templateConverter } from './templateConverter'
import { scriptTransformer } from './transformer/scriptTransformer'
import { templateTransformer } from './transformer/templateTransformer'

export function sfcParse(source: string, id: string) {
  const info = { id, filename: `${id}.vue` }
  const { descriptor, errors } = parse(source, { filename: info.filename })
  errors.forEach(e => console.warn(e))
  return { descriptor, info }
}

export function sfcConverter(source: string, id = 'sfc2esm') {
  const { descriptor, info } = sfcParse(source, id)
  const sfcAppBlock = scriptCompiler(descriptor, info)
  const sfcTemplateCompileResults = templateCompiler(descriptor.template, info)
  return [
    INIT_CODE,
    scriptTransformer(sfcAppBlock),
    templateTransformer(sfcTemplateCompileResults),
    sfcAppBlock.isScoped ? SCOPED_ID_CODE : '',
    CREATE_APP_CODE,
  ].join('\n')
}
