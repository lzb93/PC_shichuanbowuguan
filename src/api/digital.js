import request from '@/network/requestCommon';
import requestPxy from '@/network/requestPxy';

export function getCollectionList(query) { // 典藏列表
    return request({
        url: '/api/website/Os/getCollectionList',
        method: 'post',
        params: query
    });
}
export function getCollectionDetail(query) { // 典藏详情
    return request({
        url: '/api/website/Os/getCollectionDetail',
        method: 'post',
        params: query
    });
}

export function getFamousList(query) { // 名人数据库列表
    return request({
        url: '/api/website/Os/getFamousList',
        method: 'post',
        params: query
    });
}

export function getCollectionCategory(query) { // 典藏首页
    return request({
        url: '/api/website/Os/getCollectionCategory',
        method: 'post',
        params: query
    });
}


// 数创
export function getCultureCategory(query) { // 数创分类
    return request({
        url: '/api/website/Os/getCultureCategory',
        method: 'post',
        params: query
    });
}

export function getCultureList(query) { // 数创列表
    return request({
        url: '/api/website/Os/getCultureList',
        method: 'post',
        params: query
    });
}

export function getCultureDetail(query) { // 数创详情
    return request({
        url: '/api/website/Os/getCultureDetail',
        method: 'post',
        params: query
    })
}

// 专题

export function getResearchList(query) { // 研究列表
    return request({
        url: '/api/website/Os/getResearchList',
        method: 'post',
        params: query
    });
}

export function getResearchDetail(query) { // 研究详情
    return request({
        url: '/api/website/Os/getResearchDetail',
        method: 'post',
        params: query
    });
}

export function getJournalList(query) { // 馆刊列表
    return request({
        url: '/api/website/Os/getJournalList',
        method: 'post',
        params: query
    });
}

export function getJournalDetail(query) { // 馆刊详情
    return request({
        url: '/api/website/Os/getJournalDetail',
        method: 'post',
        params: query
    });
}

export function getSpecial(query) { // 专题首页
    return request({
        url: '/api/website/Os/getSpecial',
        method: 'post',
        params: query
    });
}

export function courseListSpecial(query) { // 专题页面云端课程请求域名（http://mrg-publicity.16u.cc）
    return requestPxy({
        url: '/api/pxy/publicity/front/official/courseListSpecial',
        method: 'post',
        params: query
    });
}

export function courseListGw(query) { // 云端课程列表请求域名（http://mrg-publicity.16u.cc）
    return requestPxy({
        url: '/api/pxy/publicity/front/official/courseListGw',
        method: 'post',
        params: query
    });
}

export function courseDetailGw(query) { // 课程详情请求域名（http://mrg-publicity.16u.cc）
    return requestPxy({
        url: '/api/pxy/publicity/front/official/courseDetailGw',
        method: 'post',
        params: query
    });
}

export function courseChapterGw(query) { // 云端课程章节请求域名（http://mrg-publicity.16u.cc）
    return requestPxy({
        url: '/api/pxy/publicity/front/official/courseChapterGw',
        method: 'post',
        params: query
    });
}

export function courseCommentGw(query) { // 课程评论列表请求域名（http://mrg-publicity.16u.cc）
    return requestPxy({
        url: '/api/pxy/publicity/front/official/courseCommentGw',
        method: 'post',
        params: query
    });
}