export const iconRegistry: Record<string, string> = {}

const modules = import.meta.glob('./icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

for (const path in modules) {
  const name = path.split('/').pop()?.replace('.svg', '')
  if (name) {
    iconRegistry[name] = modules[path] as string
  }
}
