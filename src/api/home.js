import request from '@/network/requestCommon';
import requestPxy from '@/network/requestPxy';

export function getBannerList(query) { // 获取banner列表
    return request({
        url: '/api/website/Os/getBannerList',
        method: 'post',
        params: query
    });
}

export function getOpenTimeAndTraffic(query) { // 开放时间和交通路线
    return request({
        url: '/api/website/Os/getOpenTimeAndTraffic',
        method: 'post',
        params: query
    });
}

export function getSpecialExhibition(query) { // 特别展览
    return request({
        url: '/api/website/Os/getSpecialExhibition',
        method: 'post',
        params: query
    });
}

export function getSystemSetting(query) { // 底部系统设置
    return request({
        url: '/api/website/Os/getSystemSetting',
        method: 'post',
        params: query
    });
}

export function getNewsListIndex(query) { // 首页资讯
    return request({
        url: '/api/website/Os/getNewsListIndex',
        method: 'post',
        params: query
    });
}

export function getActivityIndex(query) { // 首页活动列表
    return requestPxy({
        url: '/api/pxy/studyfurther/front/activity/getActivityIndex',
        method: 'post',
        params: query
    });
}