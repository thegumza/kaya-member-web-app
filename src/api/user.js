import request from '@/utils/request'
import { getUrl } from '@/utils/my-request'
import { getOrgId, getToken } from '@/utils/auth'

export function login(data) {
  return request({
    method: 'post',
    data,
    baseURL: getUrl() + '/gps/v1/auth/login'
  })
}
export function fetchList(query) {
  return request({
    baseURL: getUrl() + '/gps/v1/users',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: query
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
