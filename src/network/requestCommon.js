import axios from 'axios';

const service = axios.create({
    baseURL: '/', // api的base_url
    timeout: 20000, // 请求超时时间
});

service.defaults.headers = {
    'Content-type': 'application/json; charset=utf-8',
    // Accept: 'application/json',
    'XX-Api-Version': '1',
    'XX-Device-Type': 'pc',
    'XX-BusinessID': 80,
    'XX-Lang': 'cn',
    'XX-Domain': 'mrg.com',
}

// 默认头部属性
service.defaults.validateStatus = status => {
    return status < 1000
}

// request interceptor
service.interceptors.request.use(
    config => {
        // if (!config.headers['Authorization']) {
        //   config.headers['Authorization'] = `Bearer ${nestarkAuth.token}`
        //   console.log(projectId, 'projectId')
        //   config.headers['projectId'] = projectId
        // }
        // // 如果有 projectId
        // const curProject = store.state.app.curProject
        // config.headers.projectId = curProject && curProject.source.wnlProjectId || 6
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        const code = response.data.code
        const status = response.status

        if (typeof res === 'string') return Promise.resolve(res)

        switch (status) {
            case 500:
                showErrMsg(res)
                return Promise.reject(res)

            default:
                break
        }

        switch (code) {
            case 403: // 用户登录过期
            case 401: // 用户登录过期
            case -2:
                showErrMsg(res)
                return Promise.reject(res)
            case 500:
            case 502:
                showErrMsg(res)
                return Promise.reject(res)
            case 0:
                return res.data
            case 200:
                return res.data
            default:
                showErrMsg(res)
                return Promise.reject(res)
        }
    },
    error => {
        showErrMsg(error)
        return Promise.reject(error)
    }
)

function showErrMsg(data) {
    console.log(data)
}

export default service;