/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import request from "@/utils/request";

// 登录
export function login(params) {
    return request({
        // eslint-disable-next-line prettier/prettier
        url: "/user/login",
        method: "get",
        params,
    });
}

// 刷新token
export function refreshToken() {
    return request({
        url: "/user/refresh",
        method: "get",
    });
}


//   获取活动信息
export function getActivityDetail({id}) {
    return request({
        url: `/touch/activity/info/${id}`,
        method: "get",
    });
}

//   获取code的id
export function getCode(params) {
    return request({
        url: `/code/activity`,
        method: "get",
        params
    });
}

// douyin接口
export function getdouyin({id}) {
    return request({
        url: `/get/douyin/scheme/${id}`,
        method: "get",
    })
}
// 快手授权
export function getkuaishou({id}) {
    return request({
        url: `/get/kuaishou/authorize/link/${id}`,
        method: "get",
    })
}

// 快手发视频
export function postkuaishou(id, data){
    return request({
        url: `/kuaishou/publish/video/${id}`,
        method: 'post',
        data
    })
  }

// 小红书跳转接口
export function getscheme({ id }) {
    return request({
        url: `/get/xhs/data/${id}`,
        method: "get",
    })
}

// 视频号获取视频
export function getvideo({ id }) {
    return request({
        url: `/get/shipinhao/video/${id}`,
        method: "get",
    })
}

// 抖音获取评论
export function getcontent({ id }) {
    return request({
        url: `/get/shipinhao/content/${id}`,
        method: "get",
    })
}

// 小红书签名接口
export function getsignature() {
    return request({
        url: `/get/xhs/signature`,
        method: "get",
    })
}


//  获取JSsdk
export function getJsSdk() {
    return request({
        url: "/wechat/jssdk",
        method: "get",
        params: {
            url: window.location.href,
        },
    });
}

//  下载
export function postDownload(video_id) {
    return request({
        url: `/download/shipinhao/video/${video_id}`,
        method: "Post",
    });
}
// export function postkuaishou(data,id){
//     return request({
//         url: `/kuaishou/publish/video/${id}`,
//         method: 'post',
//         data
//     })
//   }

// 修改用户信息
export function postUser(data) {
    return request({
        url: "/center/user",
        method: "post",
        data,
    });
}
// 获取用户信息
export function getUser(data) {
    return request({
        url: "/center/user",
        method: "get",
        data,
    });
}

