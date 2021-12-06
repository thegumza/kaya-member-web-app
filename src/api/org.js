import request from '@/utils/request'
import { getOrgId, getToken, getURL } from '@/utils/auth'

export function fetchOrg() {
  return request({
    baseURL: getURL() + '/api/v1/mobile/config',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      OrgId: getOrgId()
    },
    method: 'get'
  })
}
