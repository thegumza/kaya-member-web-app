import request from '@/utils/request'
import { getOrgId, getUserData, getToken, getURL, getUserDetailData } from '@/utils/auth'

export function login(query) {
  return request({
    method: 'get',
    // baseURL: getUrl() + '/api/v1/mobile/member_report/login',
    baseURL: getURL() + '/api/v1/mobile/member_report/login',
    params: query
  })
}
export function fetchList() {
  const data = JSON.parse(getUserData())
  return request({
    baseURL: getURL() + '/api/v1/mobile/member_report/accounts',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: { id: data.M07 }
  })
}
export function fetchMemberReport() {
  const data = JSON.parse(getUserDetailData())
  return request({
    baseURL: getURL() + '/api/v1/mobile/member_report',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: { B03: data.M01, sortBy: 'B01:desc' }
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
