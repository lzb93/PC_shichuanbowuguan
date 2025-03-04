import request from '@/network/requestCommon';
export function getExhibitionCategorListy(query) { // 展览分类列表
    return request({
        url: '/api/website/Os/getExhibitionCategorListy',
        method: 'post',
        params: query
    });
}

export function getExhibitionList(query) { // 展览列表
    return request({
        url: '/api/website/Os/getExhibitionList',
        method: 'post',
        params: query
    });
}

export function getExhibitionDetail(query) { // 展览详情
    return request({
        url: '/api/website/Os/getExhibitionDetail',
        method: 'post',
        params: query
    });
}

export function getActivityCategory(query) { // 活动分类
    return request({
        url: '/api/pxy/studyfurther/front/activity/getActivityCategory',
        method: 'post',
        params: query
    });
}

export function getActivityGwList(query) { // 活动列表
    return request({
        url: '/api/pxy/studyfurther/front/activity/getActivityGwList',
        method: 'post',
        params: query
    });
}

export function getActivityInfoGw(query) { // 活动详情
    return request({
        url: '/api/pxy/studyfurther/front/activity/getActivityInfoGw',
        method: 'post',
        params: query
    });
}

export function getVisit(query) { // 到访
    return request({
        url: '/api/website/Os/getVisit',
        method: 'post',
        params: query
    });
}