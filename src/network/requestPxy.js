import axios from 'axios';

// 创建一个 axios 实例
const service = axios.create({
    baseURL: '', // 你的 API 基础 URL，根据实际情况修改
    timeout: 15000 // 请求超时时间
});

service.defaults.headers = {
    'Content-Type': 'multipart/form-data',
    // 'Content-type': 'application/json; charset=utf-8',
    // Accept: 'application/json',
    'XX-Api-Version': '1',
    'XX-Device-Type': 'pc',
    'XX-BusinessID': 80,
    'XX-Lang': 'cn',
    'XX-Domain': 'mrg.com',
    // 'XX-Token': 'fb399eb024fff8d42a5e3c56fbd29dd2d12ece9d'
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 设置请求头为 form-data
        // config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    error => {
        // 处理请求错误
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
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
                return res
            case 1:
                return res
            case 200:
                return res
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

/**
 * 封装 form-data 请求方法
 * @param {string} url 请求的 URL
 * @param {Object} data 请求的数据
 * @param {Object} config 其他配置项
 * @returns {Promise} 返回一个 Promise 对象
 */
const formDataRequest = ({ url, params = {}, method = 'post', config = {} }) => {
    // 创建一个 FormData 对象
    const formData = new FormData();
    // 将数据添加到 FormData 中
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            formData.append(key, params[key]);
        }
    }
    // 发送 POST 请求
    return service[method](url, formData, config);
};

export default formDataRequest;