import request from '@/utils/request'

//   获取活动信息
export function getActivityDetail({ id }) {
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

// 抖音接口
export function getDouYin({ id }) {
    return request({
        url: `/get/douyin/scheme/${id}`,
        method: "get",
    })
}

// 快手授权
export function getKS({ id }) {
    return request({
        url: `/get/kuaishou/authorize/link/${id}`,
        method: "get",
    })
}

// 快手发视频
export function postKS(id, data) {
    return request({
        url: `/kuaishou/publish/video/${id}`,
        method: 'post',
        data
    })
}

// 小红书跳转接口
export function getXhs({ id }) {
    return request({
        url: `/get/xhs/data/${id}`,
        method: "get",
    })
}

// 视频号获取视频
export function getVideo({ id }) {
    return request({
        url: `/get/shipinhao/video/${id}`,
        method: "get",
    })
}

// 抖音获取评论
export function getContent({ id }) {
    return request({
        url: `/get/shipinhao/content/${id}`,
        method: "get",
    })
}

// 小红书签名接口
export function getSignature() {
    return request({
        url: `/get/xhs/signature`,
        method: "get",
    })
}


//  获取JSSdk
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

