import { parse } from '@vue/compiler-sfc'

export function sfcParse(source: string, id: string) {
  const info = { id, filename: `${id}.vue` }
  const { descriptor, errors } = parse(source, { filename: info.filename })
  errors.forEach(e => console.warn(e))
  return { descriptor, info }
}
