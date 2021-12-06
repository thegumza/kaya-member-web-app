const OrgDataKey = 'OrgData'
const BookListKey = 'BookListData'

export function getOrg() {
  return JSON.parse(window.localStorage.getItem(OrgDataKey))
}

export function setOrg(data) {
  return window.localStorage.setItem(OrgDataKey, JSON.stringify(data))
}

export function removeOrg() {
  return window.localStorage.setItem(OrgDataKey, null)
}

export function getBookList() {
  return JSON.parse(window.localStorage.getItem(BookListKey))
}

export function setBookList(data) {
  return window.localStorage.setItem(BookListKey, JSON.stringify(data))
}

export function removeBookList() {
  return window.localStorage.setItem(BookListKey, null)
}
