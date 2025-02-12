// import { } from '@/api/index'
import { setToken, removeToken } from '@/utils/auth'

const state = {
  project_name: '', // 项目名称
  service: '', // 客服
  token: '',
  info: { avatar: '', nickname: '' }, // 登陆用户信息
  link: '',
  copyRight: '',
  aliOss: {},
  userId: ''
}

const mutations = {
  SET_PROJECT: (state, data) => {
    if (data.act_rule) state.act_rule = data.act_rule
    state.project_name = data.project_name
    state.service = data.weapp_d_service
    state.copyRight = 'Copyright 2014-' + new Date().getFullYear() + data.project_support + '. All Rights Reserved'
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_LINK: (state, data) => {
    // 防封处理
    state.link = `${data.domain}/?appid=${data.appid}&redirect_uri=${window.location.href.split('?')[0]}&scope=snsapi_userinfo&response_type=code&state=STATE#wechat_redirect`
    // state.link = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9bbc9d1da5e4debc&redirect_uri=${encodeURIComponent(href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  },
  SET_AL_TOKEN: (state, aliOss) => {
    state.aliOss = aliOss
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
}

const actions = {
  // 登陆
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      // CommonUploadToken(data)
      //   .then(res => {
      //     commit('SET_TOKEN', res.data)
      //     resolve(res)
      //   }).catch((err) => {
      //     console.log(err)
      //     alert('err')
      //     reject()
      //   })
    })
  },

  // 退出
  logOut({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo().then(response => {
      //   const { data } = response
      //   commit('SET_USER_ID', data.userId)
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 获取阿里token
  getAli({ commit }, data) {
    return new Promise((resolve, reject) => {
      // GetAliToken(data).then((res) => {
      //   commit('SET_AL_TOKEN', res.data)
      //   resolve(res.data)
      // }).catch((err) => {
      //   reject(err)
      // })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
