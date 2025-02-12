/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import wx from 'weixin-js-sdk'


const state = {
    copyRight: 'CopyRight @2025碰一碰',
}

const mutations = {
    SET_BASE: (state, base) => {
        state.base = base
    },
}

const actions = {
    // getActivityInfo({ commit }, data) {
        // return new Promise((resolve, reject) => {
        //     getActivityDetail(data)
        //         .then((res) => {
        //             const {  } = res.data
        //             resolve(res.data)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //             reject()
        //         })
        // })
    // },


    openLocation({ state }) {
        wx.openLocation({
            latitude: state.concatInfo.storeLocation.lat, // 纬度，浮点数，范围为90 ~ -90
            longitude: state.concatInfo.storeLocation.lng, // 经度，浮点数，范围为180 ~ -180。
            name: state.concatInfo.storeName, // 位置名
            address: state.concatInfo.storeAddress, // 地址详情说明
            scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
