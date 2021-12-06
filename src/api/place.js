import request from '@/utils/request'
import { getUrl } from '@/utils/my-request'
import { getToken, getOrgId } from '@/utils/auth' // get token from cookie

export function fetchList(query) {
  return request({
    baseURL: getUrl() + '/gps/v1/place',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: query
  })
}

export function fetchPlace(id) {
  return request({
    baseURL: getUrl() + '/gps/v1/place/' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    baseURL: getUrl() + '/gps/v1/place',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: { pv }
  })
}

export function createPlace(data) {
  return request({
    baseURL: getUrl() + '/gps/v1/place',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'post',
    data
  })
}

export function updatePlace(id, data) {
  return request({
    baseURL: getUrl() + '/gps/v1/place' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'patch',
    data
  })
}
