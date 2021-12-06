export function formatTextDate(text) {
  try {
    if (text !== '' && text !== undefined) {
      const date = text.split('/')
      let year = ''
      if (date[2].toString().length === 11) year = parseInt(date[2], 10) + 2543
      else year = parseInt(date[2], 10) + 543
      return `${date[0]}/${date[1]}/${year}`
    }
    return '-'
  } catch (e) {
    return text
  }
}
