// import { JSDOM } from 'jsdom'
import { load } from 'cheerio'

export function getTagName(html: string): string[] {
  const $ = load(`<main>${html}</main>`)
  return [...$('main>*')].map(e => e.name)
}
