/* eslint-disable indent */
// import { setToken, removeToken } from '@/utils/auth'

// import { getActivityInfo } from '../../api/index.js';
import { getActivityInfo, getCode } from '@/api/index';

const state = {
  form:{

  }
}

const mutations = {
  // 
  SET_INFO: (state, info) => {
    state.form = info
  },
}

const actions = {
  // 获取
  getActivityDetail({ commit, state },id) {
    return new Promise((resolve, reject) => {
    //   getActivityInfo(id).then(response => {
    //     const { data } = response
    //     commit('SET_INFO', data)
    //     resolve(response)
    //   }).catch(error => {
    //     reject(error)
    //   })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
