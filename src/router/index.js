import { createRouter, createWebHistory } from 'vue-router'

// 递归函数将树平铺成数组
const flattenTree = (tree) => {
    let result = [];
    tree.forEach((node) => {
        // if (node.children && node.children.length > 0) {
        //     node.child = JSON.parse(JSON.stringify(node.children))
        //     if (node.redirect) {
        //         node.children = []
        //     }
        // }
        result.push(node);
        // if (!node.redirect) { // 有重定向的路由就不平铺进去了
        //     result.push(node);
        // }
        if (node.children && node.children.length > 0) {
            result = result.concat(flattenTree(node.children));
        }
    });
    return result;
};


const routesTree = [
    // 参观与活动
    {
        path: '/visitsAndActivities',
        redirect: '/visitsAndActivities/come',
        meta: {
            title: '参观与活动'
        },
        children: [{
                path: '/visitsAndActivities/come',
                name: 'Come',
                component: () =>
                    import ('../views/visitsAndActivities/come.vue'),
                meta: {
                    title: '到访'
                }
            },
            {
                path: '/visitsAndActivities/activitie',
                name: 'Activitie',
                component: () =>
                    import ('../views/visitsAndActivities/activitie.vue'),
                meta: {
                    title: '活动'
                },
                children: [{
                    path: '/visitsAndActivities/activitie/:id',
                    name: 'ActivitieDetail',
                    component: () =>
                        import ('../views/visitsAndActivities/activitieDetail.vue'),
                    meta: {
                        title: '活动详情',
                        pid: 'Activitie'
                    }
                }, ]
            },
            {
                path: '/visitsAndActivities/visits',
                name: 'Visits',
                component: () =>
                    import ('../views/visitsAndActivities/visits.vue'),
                meta: {
                    title: '展览'
                },
                children: [{
                    path: '/visitsAndActivities/visits/:id',
                    name: 'VisitsDetail',
                    component: () =>
                        import ('../views/visitsAndActivities/visitsDetail.vue'),
                    meta: {
                        title: '展览详情',
                        pid: 'Visits'
                    }
                }, ]
            }
        ]
    },

    //数创空间
    {
        path: '/digitalSpace',
        redirect: '/digitalSpace/index',
        meta: {
            title: '数创空间'
        },
        children: [{
                path: '/digitalSpace/collect',
                name: 'Collect',
                component: () =>
                    import ('../views/digitalSpace/collect/index.vue'),
                meta: {
                    title: '典藏'
                },
                children: [{
                        path: '/digitalSpace/collect/list',
                        name: 'CollectList',
                        component: () =>
                            import ('../views/digitalSpace/collect/list.vue'),
                        meta: {
                            title: '典藏列表',
                            pid: 'Collect'
                        }
                    },
                    {
                        path: '/digitalSpace/collect/:id',
                        name: 'CollectDetail',
                        component: () =>
                            import ('../views/digitalSpace/collect/detail.vue'),
                        meta: {
                            title: '典藏详情',
                            pid: 'Collect/CollectList'
                        }
                    },
                    {
                        path: '/digitalSpace/collect/database',
                        name: 'CollectDatabase',
                        component: () =>
                            import ('../views/digitalSpace/collect/database.vue'),
                        meta: {
                            title: '名人数据库',
                            pid: 'Collect'
                        }
                    },
                    {
                        path: '/digitalSpace/collect/chart',
                        name: 'CollectChart',
                        component: () =>
                            import ('../views/digitalSpace/collect/chart.vue'),
                        meta: {
                            title: '知识图谱',
                            pid: 'Collect'
                        }
                    },
                    {
                        path: '/digitalSpace/collect/chat',
                        name: 'CollectChat',
                        component: () =>
                            import ('../views/digitalSpace/collect/chat.vue'),
                        meta: {
                            title: '知识问答',
                            pid: 'Collect'
                        }
                    }
                ]
            },
            {
                path: '/digitalSpace/special',
                name: 'Special',
                component: () =>
                    import ('../views/digitalSpace/special/index.vue'),
                meta: {
                    title: '专题'
                },
                children: [{
                        path: '/digitalSpace/special/exhibition',
                        name: 'Exhibition',
                        component: () =>
                            import ('../views/digitalSpace/special/exhibition.vue'),
                        meta: {
                            title: '云端展览',
                            pid: 'Special'
                        }
                    },
                    {
                        path: '/digitalSpace/special/course',
                        name: 'SpecialCourse',
                        component: () =>
                            import ('../views/digitalSpace/special/course.vue'),
                        meta: {
                            title: '云端课程',
                            pid: 'Special'
                        },
                        children: [{
                            path: '/digitalSpace/special/course/:id',
                            name: 'SpecialCourseDetail',
                            component: () =>
                                import ('../views/digitalSpace/special/courseDetail.vue'),
                            meta: {
                                title: '云端课程详情',
                                pid: 'Special/SpecialCourse'
                            }
                        }]
                    },
                    {
                        path: '/digitalSpace/special/study',
                        name: 'SpecialStudy',
                        component: () =>
                            import ('../views/digitalSpace/special/study.vue'),
                        meta: {
                            title: '研究',
                            pid: 'Special'
                        },
                        children: [{
                            path: '/digitalSpace/special/study/:id',
                            name: 'SpecialStudyDetail',
                            component: () =>
                                import ('../views/digitalSpace/special/studyDetail.vue'),
                            meta: {
                                title: '研究详情',
                                pid: 'Special/SpecialStudy'
                            }
                        }]
                    },
                    {
                        path: '/digitalSpace/special/journal',
                        name: 'SpecialJournal',
                        component: () =>
                            import ('../views/digitalSpace/special/journal.vue'),
                        meta: {
                            title: '馆刊',
                            pid: 'Special'
                        },
                        children: [{
                            path: '/digitalSpace/special/journal/:id',
                            name: 'SpecialJournalDetail',
                            component: () =>
                                import ('../views/digitalSpace/special/journalDetail.vue'),
                            meta: {
                                title: '馆刊详情',
                                pid: 'Special/SpecialJournal'
                            }
                        }]
                    }
                ]
            },
            {
                path: '/digitalSpace/index',
                name: 'DigitalSpace',
                component: () =>
                    import ('../views/digitalSpace/index.vue'),
                meta: {
                    title: '数创'
                },
                children: [{
                    path: '/digitalSpace/index/:id',
                    name: 'DigitalSpaceDetail',
                    component: () =>
                        import ('../views/digitalSpace/detail.vue'),
                    meta: {
                        title: '数创详情',
                        pid: 'DigitalSpace'
                    },
                }]
            },
        ]
    },

    //媒体中心
    {
        path: '/mediaCenter',
        name: 'MediaCenter',
        component: () =>
            import ('../views/mediaCenter/index.vue'),
        meta: {
            title: '媒体中心'
        },
        children: [{
                path: '/mediaCenter/messaget',
                name: 'MediaCenterMessaget',
                component: () =>
                    import ('../views/mediaCenter/messagetList.vue'),
                meta: {
                    title: '资讯',
                    pid: 'MediaCenter'
                },
                children: [{
                    path: '/mediaCenter/messaget/:id',
                    name: 'MediaCenterMessagetDetail',
                    component: () =>
                        import ('../views/mediaCenter/messagetDetail.vue'),
                    meta: {
                        title: '资讯详情',
                        pid: 'MediaCenterMessaget'
                    }
                }, ]
            },
            {
                path: '/mediaCenter/notice',
                name: 'MediaCenterNotice',
                component: () =>
                    import ('../views/mediaCenter/noticeList.vue'),
                meta: {
                    title: '公告',
                    pid: 'MediaCenter'
                },
                children: [{
                    path: '/mediaCenter/notice/:id',
                    name: 'MediaCenterNoticeDetail',
                    component: () =>
                        import ('../views/mediaCenter/noticeDetail.vue'),
                    meta: {
                        title: '公告详情',
                        pid: 'MediaCenterNotice'
                    }
                }, ]
            },
            {
                path: '/about',
                name: 'About',
                component: () =>
                    import ('../views/about.vue'),
                meta: {
                    title: '关于四川名人馆',
                }
            },
            {
                path: '/all',
                name: 'All',
                component: () =>
                    import ('../views/mediaCenter/all.vue'),
                meta: {
                    title: '全媒体矩阵',
                }
            },
        ]
    },
]

const flattenedArray = flattenTree(routesTree);
// flattenedArray.map(item => {
//     item.children = undefined
// })

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routesTree,
    routes: [{
            path: '/',
            name: 'Home',
            component: () =>
                import ('../views/home.vue'),
            meta: {
                title: '首页'
            }
        },
        ...flattenedArray,
        {
            // 匹配所有未定义的路径，用于 404 页面
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () =>
                import ('../views/notFound.vue'),
            meta: {
                title: '页面未找到'
            },
            hide: true
        },
    ],
    // 路由切换时滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
})

export default router