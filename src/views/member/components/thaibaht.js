/**
 * @name BAHTTEXT.js
 * @version 1.1.5
 * @update May 1, 2017
 * @website: https://github.com/earthchie/BAHTTEXT.js
 * @author Earthchie http://www.earthchie.com/
 * @license WTFPL v.2 - http://www.wtfpl.net/
 * */
export function thaiBath(num, suffix) {
  if (typeof suffix === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    suffix = 'บาทถ้วน'
  }

  // eslint-disable-next-line no-param-reassign
  num = num || 0
  // eslint-disable-next-line no-param-reassign
  num = num.toString().replace(/[, ]/g, '') // remove commas, spaces

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num) || Math.round(parseFloat(num) * 100) / 100 === 0) {
    return 'ศูนย์บาทถ้วน'
  }

  const t = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน']
  const n = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
  let len
  let digit
  let text = ''
  let parts
  let i

  if (num.indexOf('.') > -1) {
    // have decimal

    /*
     * precision-hack
     * more accurate than parseFloat the whole number
     */

    parts = num.toString().split('.')

    // eslint-disable-next-line no-param-reassign,prefer-destructuring
    num = parts[0]
    parts[1] = parseFloat(`0.${parts[1]}`)
    parts[1] = (Math.round(parts[1] * 100) / 100).toString() // more accurate than toFixed(2)
    parts = parts[1].split('.')

    if (parts.length > 1 && parts[1].length === 1) {
      parts[1] = `${parts[1].toString()}0`
    }

    // eslint-disable-next-line no-param-reassign
    num = parseInt(num, 10) + parseInt(parts[0], 10)

    /*
     * end - precision-hack
     */
    text = num ? thaiBath(num) : ''

    if (parseInt(parts[1], 10) > 0) {
      text = text.replace('ถ้วน', '') + thaiBath(parts[1], 'สตางค์')
    }

    return text
  }

  if (num.length > 7) {
    // more than (or equal to) 10 millions

    const overflow = num.substring(0, num.length - 6)
    const remains = num.slice(-6)
    return thaiBath(overflow).replace('บาทถ้วน', 'ล้าน') + thaiBath(remains).replace('ศูนย์', '')
  }

  // eslint-disable-next-line prefer-const
  len = num.length
  for (i = 0; i < len; i += 1) {
    digit = parseInt(num.charAt(i), 10)
    if (digit > 0) {
      if (len > 2 && i === len - 1 && digit === 1 && suffix !== 'สตางค์') {
        text += `เอ็ด${t[len - 1 - i]}`
      } else {
        text += n[digit] + t[len - 1 - i]
      }
    }
  }

  // grammar correction
  text = text.replace('หนึ่งสิบ', 'สิบ')
  text = text.replace('สองสิบ', 'ยี่สิบ')
  text = text.replace('สิบหนึ่ง', 'สิบเอ็ด')

  return text + suffix
}
