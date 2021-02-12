import { createRouter, createWebHashHistory } from 'vue-router';
import requireContext from '@/until/requireContext';
import authority from './authority';
const mir = requireContext(require.context('./modules', true, /\.js$/));
const businessRoute = Object.values(Object.values(mir)).reduce((x, y) => {
    return Object.assign(x, y);
}, {});
const baseRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404')
    },
    {
        path: '/erp',
        name: 'Layout',
        component: () => import('@/layout/index'),
        redirect: '/erp/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '审核台',
                    noCache: true,
                    affix: true
                },
                component: () => import(/* webpackChunkName: "about" */ '../views/Home')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: baseRouter,
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

// 加载前置路由控制
router.beforeEach(authority);
router.onError((error) => {
    console.log(error);
});
export default router;
export { businessRoute, baseRouter };
