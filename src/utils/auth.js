import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const OrgIdKey = 'OrgId'
const UserDataKey = 'UserData'
const UserDetailDataKey = 'UserDetailData'
const URLKey = 'URLKey'
const OrgTypeKey = 'OrgTypeKey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getOrgId() {
  return Cookies.get(OrgIdKey)
}

export function setOrgId(OrgId) {
  return Cookies.set(OrgIdKey, OrgId)
}

export function removeOrgId() {
  return Cookies.remove(OrgIdKey)
}
export function getUserData() {
  return Cookies.get(UserDataKey)
}

export function setUserData(UserData) {
  return Cookies.set(UserDataKey, UserData)
}

export function removeUserData() {
  return Cookies.remove(UserDataKey)
}

export function getUserDetailData() {
  return Cookies.get(UserDetailDataKey)
}

export function setUserDetailData(UserDetailData) {
  return Cookies.set(UserDetailDataKey, UserDetailData)
}

export function removeUserDetailData() {
  return Cookies.remove(UserDetailDataKey)
}

export function getURL() {
  return Cookies.get(URLKey)
}

export function setURL(url) {
  return Cookies.set(URLKey, url)
}

export function removeURL() {
  return Cookies.remove(URLKey)
}

export function getOrgType() {
  return Cookies.get(OrgTypeKey)
}

export function setOrgType(type) {
  return Cookies.set(OrgTypeKey, type)
}

export function removeOrgType() {
  return Cookies.remove(OrgTypeKey)
}
