export type SFCTag = '<script>' | '<script setup>' | '<template>' | '<style>' | '<style scoped>'
export function closeTag(tag: SFCTag, inner: string): string {
  return tag + inner + tag.replace('<', '</')
}
