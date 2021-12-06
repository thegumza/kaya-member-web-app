import request from '@/utils/request'
import { getUrl } from '@/utils/my-request'
import { getOrgId, getToken } from '@/utils/auth' // get token from cookie

export function fetchList(query) {
  return request({
    baseURL: getUrl() + '/gps/v1/route',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: query
  })
}

export function fetchRoute(id) {
  return request({
    baseURL: getUrl() + '/gps/v1/route/' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    baseURL: getUrl() + '/gps/v1/route',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: { pv }
  })
}

export function createRoute(data) {
  return request({
    baseURL: getUrl() + '/gps/v1/route',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'post',
    data
  })
}

export function updateRoute(id, data) {
  return request({
    baseURL: getUrl() + '/gps/v1/route/' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'patch',
    data
  })
}
