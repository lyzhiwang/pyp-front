/* eslint-disable indent */
import request from '@/utils/request'

// 总体详情
export function getActivityInfo(params) {
    return request({
        url: `/touch/activity/info/${params.id}`,
        method: "get",
    });
}

// 抖音接口
export function getDy({id}) {
    return request({
        url: `/get/douyin/scheme/${id}`,
        method: "get",
    })
}

// 小红书跳转接口
export function getXhs({ id }) {
    return request({
        url: `/get/xhs/data/${id}`,
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

// 视频号获取视频
export function getVideo({ id }) {
    return request({
        url: `/get/shipinhao/video/${id}`,
        method: "get",
    })
}

// 视频号获取评论
export function getContent({ id }) {
    return request({
        url: `/get/shipinhao/content/${id}`,
        method: "get",
    })
}

//  视频号视频下载
export function postDownload(video_id) {
    return request({
        url: `/download/shipinhao/video/${video_id}`,
        method: "Post",
    });
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
