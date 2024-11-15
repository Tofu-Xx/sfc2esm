export type SFCTag = typeof _tags[number]
const _tags = ['<script>', '<script setup>', '<template>', '<style>', '<style scoped>'] as const
export function toSfcCode(source: string, tag: SFCTag): string {
  const _closeTag = (tag: SFCTag, source: string) => tag + source + tag.replace('<', '</')
  return _tags.map(t => _closeTag(t, tag === t ? source : '')).join('\n')
}
