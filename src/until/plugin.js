import ElementPlus from 'element-plus';
import routeMenuAuth from './customPlugin/routeMenuAuth/index';
import store from '@/store/index';
import router from '@/router/index';
/** 引入style文件夹所有scss文件*/
// require.context('../style', true, /\.scss$/);
import '@/style/global.scss';
export default {
    install: (Vue) => {
        /** 挂载插件*/
        Vue.use(ElementPlus);
        Vue.use(routeMenuAuth({ store }));

        /** 挂载原型方法*/
        Vue.config.globalProperties = {
            $router: router,
            $store: store,
            $route: router.currentRoute
        };
    }
};
