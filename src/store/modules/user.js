// import { } from '@/api/index'
import { setToken, removeToken, setOpenId } from '@/utils/auth'

const state = {
  project_name: '', // 项目名称
  service: '', // 客服
  token: '',
  info: { avatar: '', nickname: '' }, // 登陆用户信息
  link: '',
  copyRight: '',
  openid: '',
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
  SET_LINK: (state, data) => {
    // 防封处理
    // state.link = `${data.domain}/?appid=${data.appid}&redirect_uri=${window.location.href.split('?')[0]}&scope=snsapi_userinfo&response_type=code&state=STATE#wechat_redirect`
    // state.link = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9bbc9d1da5e4debc&redirect_uri=${encodeURIComponent(href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    // state.link =
    //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    //   data.appid +
    //   "&redirect_uri=" +
    //   encodeURIComponent(window.location.href.split('?')[0]) +
    //   "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";

      // wx937b15f5d0f50a47
      state.link =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      'wx937b15f5d0f50a47' +
      "&redirect_uri=" +
      encodeURIComponent(window.location.href) +
      "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
  },
  SET_OPENID: (state, openid) => {
    state.openid = openid
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
  // 更新 link
  refreshLink({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      console.log('refreshLink')
      console.log(params)
      commit('SET_LINK', params)
      commit('SET_OPENID', 1)
      resolve(state.link)
      // console.log('SET_LINK', res.data)
      // window.location.href =
      // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      // appid +
      // "&redirect_uri=" +
      // encodeURIComponent(window.location.href) +
      // "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      // getLoginLink().then((res) => {
      //   console.log('SET_LINK', res.data)
      //   commit('SET_LINK', res.data)
      //   resolve(state.link)
      // }).catch((err) => {
      //   console.log(err)
      //   reject()
      // })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
