import { fetchOrg } from '@/api/org'
import { setOrg } from '@/utils/localStorage'

const actions = {
  // fetch org data
  fetchOrg({ commit }) {
    return new Promise((resolve, reject) => {
      fetchOrg().then(response => {
        setOrg(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
