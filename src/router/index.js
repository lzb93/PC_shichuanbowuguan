import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                title: '首页'
            }
        },

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
                            title: '活动详情'
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
                            title: '展览详情'
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
                                title: '典藏列表'
                            }
                        },
                        {
                            path: '/digitalSpace/collect/:id',
                            name: 'CollectDetail',
                            component: () =>
                                import ('../views/digitalSpace/collect/detail.vue'),
                            meta: {
                                title: '典藏详情'
                            }
                        },
                        {
                            path: '/digitalSpace/collect/database',
                            name: 'CollectDatabase',
                            component: () =>
                                import ('../views/digitalSpace/collect/database.vue'),
                            meta: {
                                title: '名人数据库'
                            }
                        },
                        {
                            path: '/digitalSpace/collect/chart',
                            name: 'CollectChart',
                            component: () =>
                                import ('../views/digitalSpace/collect/chart.vue'),
                            meta: {
                                title: '知识图谱'
                            }
                        },
                        {
                            path: '/digitalSpace/collect/chat',
                            name: 'CollectChat',
                            component: () =>
                                import ('../views/digitalSpace/collect/chat.vue'),
                            meta: {
                                title: '知识问答'
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
                                title: '云端展览'
                            }
                        },
                        {
                            path: '/digitalSpace/special/course',
                            name: 'SpecialCourse',
                            component: () =>
                                import ('../views/digitalSpace/special/course.vue'),
                            meta: {
                                title: '云端课程'
                            },
                            children: [{
                                path: '/digitalSpace/special/course/:id',
                                name: 'SpecialCourseDetail',
                                component: () =>
                                    import ('../views/digitalSpace/special/courseDetail.vue'),
                                meta: {
                                    title: '云端课程'
                                }
                            }]
                        },
                        {
                            path: '/digitalSpace/special/study',
                            name: 'SpecialStudy',
                            component: () =>
                                import ('../views/digitalSpace/special/study.vue'),
                            meta: {
                                title: '研究'
                            },
                            children: [{
                                path: '/digitalSpace/special/study/:id',
                                name: 'SpecialStudyDetail',
                                component: () =>
                                    import ('../views/digitalSpace/special/studyDetail.vue'),
                                meta: {
                                    title: '研究'
                                }
                            }]
                        },
                        {
                            path: '/digitalSpace/special/journal',
                            name: 'SpecialJournal',
                            component: () =>
                                import ('../views/digitalSpace/special/journal.vue'),
                            meta: {
                                title: '馆刊'
                            },
                            children: [{
                                path: '/digitalSpace/special/journal/:id',
                                name: 'SpecialJournalDetail',
                                component: () =>
                                    import ('../views/digitalSpace/special/journalDetail.vue'),
                                meta: {
                                    title: '馆刊'
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
                            title: '数创'
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
                        title: '资讯'
                    },
                    children: [{
                        path: '/mediaCenter/messaget/:id',
                        name: 'MediaCenterMessagetDetail',
                        component: () =>
                            import ('../views/mediaCenter/messagetDetail.vue'),
                        meta: {
                            title: '资讯'
                        }
                    }, ]
                },
                {
                    path: '/mediaCenter/notice',
                    name: 'MediaCenterNotice',
                    component: () =>
                        import ('../views/mediaCenter/noticeList.vue'),
                    meta: {
                        title: '公告'
                    },
                    children: [{
                        path: '/mediaCenter/notice/:id',
                        name: 'MediaCenterNoticeDetail',
                        component: () =>
                            import ('../views/mediaCenter/noticeDetail.vue'),
                        meta: {
                            title: '公告'
                        }
                    }, ]
                },
                {
                    path: '/about',
                    name: 'About',
                    component: () =>
                        import ('../views/about.vue'),
                    meta: {
                        title: '关于四川名人馆'
                    }
                },
                {
                    path: '/all',
                    name: 'All',
                    component: () =>
                        import ('../views/mediaCenter/all.vue'),
                    meta: {
                        title: '全媒体矩阵'
                    }
                },
            ]
        },

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
})

export default router