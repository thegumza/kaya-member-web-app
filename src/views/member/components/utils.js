function ToFixed(num, dec) {
  if (typeof (pre) !== 'undefined' && pre != null) { var decimals = dec } else { var decimals = 2 }

  num *= Math.pow(10, decimals)
  num = (Math.round(num, decimals) + (((num - Math.round(num, decimals)) >= 0.4) ? 1 : 0)) / Math.pow(10, decimals)
  return num.toFixed(decimals)
}
// แสดงผล แบบ ปัดเศษ
export function formatNumber(value) {
  if (typeof value === 'number') {
    return parseFloat(ToFixed(value)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  } else {
    return parseFloat(ToFixed(value)).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  }
}
// แปลงเพื่แสดงผล แบบ ไม่ปัดเศษ
export function formatNumber2Digit(value) {
  if (typeof value === 'number') {
    return ToFixed(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return parseFloat(ToFixed(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
