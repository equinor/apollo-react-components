/**
 * Generate a HSL color based on a given string.
 *
 * @param str - Any given string
 * @returns A valid hsl color
 */
export function stringToHslColor(str: string, s = 80, l = 85) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  var h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}
