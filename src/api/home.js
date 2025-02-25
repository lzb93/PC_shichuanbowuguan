import request from '@/network/requestCommon';

export function getBannerList(query) {
    return request({
        url: '/api/website/Os/getBannerList',
        method: 'post',
        params: query
    });
}
export function bbb(query) {
    return request({
        url: '/bbb',
        method: 'post',
        params: query
    });
}