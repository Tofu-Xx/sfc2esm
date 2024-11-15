import { JSDOM } from 'jsdom'

export function getRootTagName(html: string): string[] {
  const doc = new JSDOM(html).window.document
  return Array.from(doc.documentElement.children).map(e => e.localName)
}
