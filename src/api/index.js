/* eslint-disable indent */
import request from '@/utils/request'

// 总体详情
export function getActivityInfo(params) {
    return request({
        url: `/touch/activity/info/${params.id}`,
        method: "get",
        loading: true
    });
}

// 抖音接口 不发红包
export function getDy({ id }) {
    return request({
        url: `/get/douyin/scheme/${id}`,
        method: "get",
    })
}
// 抖音接口 发红包
export function getDyTwo(data) {
    return request({
        url: `/get/douyin/scheme/${data.id}`,
        method: "get",
        params:{openid:data.openid}
    })
}

// 获取小红书 数据
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

// 获取小红书 数据 图文
export function getImageXhs({ id }) {
    return request({
        url: `/get/xhs/image/data/${id}`,
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


//   code换取碰一碰活动id
export function getCode(params) {
    return request({
        url: `/code/activity`,
        method: "get",
        loading: false,
        params
    });
}

// 快手授权
export function getKsAuthorizeLink({ id }) {
    return request({
        url: `/get/kuaishou/authorize/link/${id}`,
        method: "get",
    })
}

// 快手发视频
export function postKsPublishVideo(id, data) {
    return request({
        url: `/kuaishou/publish/video/${id}`,
        method: 'post',
        data
    })
}

// code 换取openid
export function getCodeToOpenid(params) {
    return request({
        url: `/code/to/openid`,
        method: "get",
        loading: false,
        params
    });
}

// 增加活动碰一碰次数
export function PostAddTouchNumber(id) {
    return request({
        url: `/add/touch/number/${id}`,
        method: "post",
        loading: false
    });
}

// 增加活动扫码次数
export function PostAddScanNumber(id) {
    return request({
        url: `/add/scan/number/${id}`,
        method: "post",
        loading: false
    });
}

// 获取代驾链接
export function getDaiJiaUrl(params) {
    return request({
        url: `/get/daijia/url`,
        method: "get",
        loading: false,
        params
    });
}

// 获取碰一碰数据
export function getAddTouchData(data) {
    return request({
        url: `/add/touch/data/${data.id}`,
        method: "get",
        loading: false,
        params:{ type:data.type }
    });
    // 1:douyin_click_number 2:kuaishou_click_number 3:xiaohongshu_click_number 4:shipinhao_click_number
    // 5:friend_number 6:xhs_image_number
    // 7:dianping_number 8:meituan_number 9:gaode_number 10:xiecheng_number
    // 11:douyin_follow_number 12:douyin_poi_follow_number 13:xhs_follow_number 14:wechat_number
    // 15:wifi_number 16:daijia_number
}

