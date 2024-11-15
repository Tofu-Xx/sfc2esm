export type SFCTag = typeof _tags[number]
const _tags = ['<script>', '<script setup>', '<template>', '<style>', '<style scoped>'] as const
export function toSfcCode(source: string, tag: SFCTag): string {
  const closeTag = (tag: SFCTag, source: string) => tag + source + tag.replace('<', '</')
  const isScript = tag.includes('script')
  return (isScript ? '' : '<script>/*  */</script>') + closeTag(tag, source)
}
