import dayjs from 'dayjs'

export function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function getCurrentDate() {
  return dayjs(new Date()).format('YYYY-MM-DD')
}
