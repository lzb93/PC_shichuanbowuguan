import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        // vueDevTools(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // 全局通用变量
                additionalData: "@use '@/assets/variables.scss';"
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        },
    },
    // server: {
    //     host: '0.0.0.0',
    //     port: 8889
    // }
    server: {
        host: '0.0.0.0',
        port: 8889,
        hmr: {
            overlay: true
        },
        proxy: {
            '/api': {
                // target: 'http://mrg.com/api', // hosts 配置地址
                target: 'https://dev-mrg-zlt.16u.cc/api', // 测试环境地址
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})