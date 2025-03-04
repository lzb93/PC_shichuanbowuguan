import request from '@/network/requestCommon';

export function getNewsList(query) { // 资讯列表
    return request({
        url: '/api/website/Os/getNewsList',
        method: 'post',
        params: query
    });
}
export function getNewsDetail(query) { // 资讯详情
    return request({
        url: '/api/website/Os/getNewsDetail',
        method: 'post',
        params: query
    });
}
export function getNoticeList(query) { // 公告列表
    return request({
        url: '/api/website/Os/getNoticeList',
        method: 'post',
        params: query
    });
}
export function getNoticeDetail(query) { // 公告详情
    return request({
        url: '/api/website/Os/getNoticeDetail',
        method: 'post',
        params: query
    });
}
export function getScenicIntroduce(query) { // 景区介绍
    return request({
        url: '/api/website/Os/getScenicIntroduce',
        method: 'post',
        params: query
    });
}
export function getMediaMatrixList(query) { // 全媒体矩阵
    return request({
        url: '/api/website/Os/getMediaMatrixList',
        method: 'post',
        params: query
    });
}
export function getMediaCenter(query) { // 媒体中心首页
    return request({
        url: '/api/website/Os/getMediaCenter',
        method: 'post',
        params: query
    });
}