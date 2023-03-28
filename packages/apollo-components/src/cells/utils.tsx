/**
 * Generate a HSL color based on a given string.
 *
 * @param str - Any given string
 * @returns A valid hsl color
 */
export function stringToHslColor(str: string, s = 80, l = 85) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}
