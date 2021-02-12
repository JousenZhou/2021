import vuex from './store';
const menu = Object.create(null);
import index from './index.vue';
export default function({ store }) {
    return {
        install: (Vue) => {
            // 注册vuex
            store.registerModule('routeMenuAuth', vuex);
            // 注册组件
            Vue.component('menuAuth', index);
            menu.accept = function(authRouter) {
                store.commit('routeMenuAuth/SET_ROUTE_AUTH', authRouter);
            };
            menu.switch = function(status) {
                store.commit('routeMenuAuth/SET_SIDE_STATUS', status);
            };
            menu.clear = function() {
                store.commit('routeMenuAuth/SET_ROUTE_AUTH', []);
            };
            menu.state = store.state['routeMenuAuth'];
            Vue.config.globalProperties.$menu = menu;
        }
    };
}
export { menu };
