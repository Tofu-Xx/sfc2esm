export function h(tag: string, attrs: Record<string, boolean>, inner: string) {
  return `<${tag} ${Object.entries(attrs).map(([k, v]) => v ? `${k}` : '').join(' ')}>${inner}</${tag}>`
}
