import { defineStore } from 'pinia';
import * as homeApi from '@/api/home'
import * as mediaApi from '@/api/media'
const useDataStore = defineStore('data', {
    state: () => ({
        systemData: {

        },
        mediaList: [],
        init: false
    }),
    actions: {
        async getSystemSetting() {
            try {
                const response = await homeApi.getSystemSetting();
                this.init = true
                this.systemData = response.data;
                return response.data;
            } catch (err) {
                this.init = true
                console.log(err)
                return {}
            } finally {
                // console.log('获取系统设置')
            }
        },
        async getMediaMatrixList() {
            try {
                const response = await mediaApi.getMediaMatrixList();
                this.mediaList = response.data.list;
            } catch (err) {
                console.log(err)
            } finally {
                // console.log('获取系统设置')
            }
        }
    }
});

export default useDataStore;