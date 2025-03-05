/* eslint-disable indent */
// import { setToken, removeToken } from '@/utils/auth'

// import { getActivityInfo } from '../../api/index.js';
import { getActivityInfo } from '@/api/index';

const state = {
    form: {
        act_activity_id: null,
        act_switch: false,
        appid: "wxc78d9337fed682d5",
        custom_bg: 2,
        custom_image: "https://zwklt.zwwltkl.com/FjAIDGvUAlAI8A5DFT6dH5aLZlZu",
        dianping_content: "逛洛邑古城的时候，被醉红妆汉服国风馆深深吸引。这家店位置优越，就在北门。店内汉服风格各异，有端庄大气的，也有俏皮可爱的，满足了不同人的审美需求。汉服的质量很好，细节处理得非常到位。店员热情洋溢，服务周到，让我感受到了家一般的温暖。这次汉服体验非常愉快，推荐给大家！",
        dianping_scheme: "dianping://shopinfo?shopuuid=k3JIHyPSLDBPSwJ7",
        dianping_switch: false,
        douyin_switch: false,
        friend_content: "醉红妆汉服国风馆，洛邑古城里的古风宝藏地！这里的汉服种类繁多，价格实惠到让你心动不已！专业妆造师还会为你量身打造妆容，让你在古风世界中独树一帜！姐妹们，快来这里开启你的古风之旅吧！，位置就在洛邑古城北门的醉红妆汉服店",
        friend_scheme: "weixin://",
        friend_switch: false,
        gaode_content: "醉红妆汉服国风馆，洛邑古城里的古风宝藏地！这里的汉服种类繁多，价格实惠到让你心动不已！专业妆造师还会为你量身打造妆容，让你在古风世界中独树一帜！姐妹们，快来这里开启你的古风之旅吧！",
        gaode_scheme: "amapuri://poi/detail?poiid=B0J23ZZR3M",
        gaode_switch: false,
        home_scheme: "snssdk1128://user/profile/62199199391?refer=web&gd_label=click_wap_profile_follow&type=need_follow&needlaunchlog=1",
        home_switch: false,
        id: null,
        is_redpacket:false,
        kuaishou_switch: false,
        kuaishou_url: "kwai://webview?url=https%3A%2F%2Ftouch.mudanma.com%3Ftouch_activity_id%3D15%26from%3Dkwai",
        meituan_content: "之前没穿过汉服，来洛阳是第一次穿，没想到现在洛阳的汉服店都这么专业了，就和影视剧里造型一样的，也过了一把古代瘾，化妆师专业，古风与时尚的碰撞，美出新境界！超赞，下次来洛阳还要这样来一次",
        meituan_scheme: "imeituan://www.meituan.com/gc/poi/detail?id=1755918189",
        meituan_switch: false,
        mini_program_appid: "wx8c3fb08f8337bf44",
        mini_program_icon_path: "https://zwklt.zwwltkl.com/FkbsBAfH0lNewh6f55GKVwp-j9wu",
        mini_program_name: "AI秒拍",
        mini_program_path: "pages/index/index",
        mini_program_switch: false,
        name: "汉服",
        poi_content: "这家店就在洛邑古城门口，先不要进景区，先来换上汉服，来洛阳一定要穿一次汉服，体验一把梦回大唐，感觉非常棒，汉服种类很多都很漂亮，都快挑花眼了，每个穿上都很漂亮，价格还很接地气，能穿一天，强烈推荐",
        poi_scheme: "snssdk1128://poi/detail?id=7290042935897229349&from=webview&refer=web",
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
