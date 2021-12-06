import request from '@/utils/request'
import { getUrl } from '@/utils/my-request'
import { getToken, getOrgId } from '@/utils/auth' // get token from cookie

export function fetchList(query) {
  return request({
    baseURL: getUrl() + '/gps/v1/location',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: query
  })
}

export function fetchLocation(id) {
  return request({
    baseURL: getUrl() + '/gps/v1/location/' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    baseURL: getUrl() + '/gps/v1/location',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get',
    params: { pv }
  })
}

export function createLocation(data) {
  return request({
    baseURL: getUrl() + '/gps/v1/location',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'post',
    data
  })
}

export function updateLocation(id, data) {
  return request({
    baseURL: getUrl() + '/gps/v1/location' + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'patch',
    data
  })
}
