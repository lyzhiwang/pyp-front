/* eslint-disable indent */
// import { setToken, removeToken } from '@/utils/auth'

// import { getActivityInfo } from '../../api/index.js';
import { getActivityInfo } from '@/api/index';

const state = {
    form: {
        act_activity_id: null,
        act_switch: false,
        appid: "",
        custom_bg: 2,
        custom_image: null,
        dianping_content: "",
        dianping_scheme: "",
        dianping_switch: false,
        douyin_switch: false,
        friend_content: "",
        friend_scheme: "",
        friend_switch: false,
        gaode_content: "",
        gaode_scheme: "",
        gaode_switch: false,
        home_scheme: "",
        home_switch: false,
        id: null,
        is_redpacket:false,
        kuaishou_switch: false,
        kuaishou_url: "",
        meituan_content: "",
        meituan_scheme: "",
        meituan_switch: false,
        mini_program_appid: "",
        mini_program_icon_path: "",
        mini_program_name: "",
        mini_program_path: "",
        mini_program_switch: false,
        name: "",
        poi_content: "",
        poi_scheme: "",
        poi_switch: false,
        set_meal: {
            // activity_id: 178,
            // average_price: 109,
            // banner: [
            //     "https://zwklt.zwwltkl.com/Fgm6TQ6u7b1eGaWPn7EYwHEK6DdQ",
            //     "https://zwklt.zwwltkl.com/Fj_uj81v4eLZe2-lmUmo5C92PuPA",
            //     "https://zwklt.zwwltkl.com/Fk6ardCufVk_UAOGALHemjelJfuq",
            // ],
            // detail: '',
            // effective_time: 90,
            // end_time: null,
            // exempt_reservation: 1,
            // group: [
            //     {
            //         money: "109.00",
            //         name: "109全场汉服任选",
            //         number: 1,
            //         unit: "次",
            //     }
            // ],
            // holiday_currency: 1,
            // icon_path: "https://zwklt.zwwltkl.com/Fgm6TQ6u7b1eGaWPn7EYwHEK6DdQ",
            // limit: 5,
            // order_number: 26,
            // original_price: 497,
            // price: 109,
            // rules: '',
            // set_meal_id: 256,
            // stock: 998,
            // store_name: "智网网络",
            // suit_range: "全店通用",
            // title: "109元服装化妆造型饰品发饰补妆全套",
            // type: 1
        },
        set_meal_act_id: null,
        set_meal_id: null,
        set_meal_switch: false,
        share_activity_id: null,
        share_switch: false,
        shipinhao_switch: false,
        store: {
            // address: "河南省洛阳市西工区王城大道111号",
            // business_hours: "8：30-18：30",
            // industry_id: 244,
            // introduce: "智网网络是一家专门为中小商家门拓客推广的公司",
            // location: {
            //     lat: 34.68226,
            //     lng: 112.42067,
            // },
            // logo: {
            //     id: 622,
            //     path: "https://zwklt.zwwltkl.com/Fqjj2D8G6IYFNVGAJYCWrIdf0stt"
            // },
            // logo_id: 622,
            // name: "智网网络",
            // phone: "13525491185",
            // per_capita: "100",
        },
        wechat_switch: false,
        wifi_switch: false,
        xhs_switch: false,
        xhs_follow_switch: false, // 小红书关注开关
        xhs_follow_url: '', // 小红书个人中心链接
        bxh_ad_switch:false
    },

    PageType:1 , // 1:浏览器页面  2：微信页面
    openid:''// 微信授权的openid
}

const mutations = {
    // 
    SET_INFO: (state, info) => {
        state.form = info
    },

    SET_PAGE_TYPE: (state, type) => {
        state.PageType = type
    },
    SET_OPEN_ID: (state, openid) => {
        state.openid = openid
    },
}

const actions = {
    // 获取
    getActivityDetail({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            getActivityInfo(param).then(response => {
                const { data } = response
                commit('SET_INFO', data)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
