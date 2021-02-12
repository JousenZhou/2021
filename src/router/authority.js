// 路由菜单权限
import store from '@/store/index';
// 白名单
const whiteList = ['/login', '/auth'];
export default function(to, from, next) {
    if (localStorage.getItem('token')) {
        to.path === '/login'
            ? next()
            : (async () => {
                  // 是否有权限路由
                  store.state.routeMenuAuth.routeAuth.length
                      ? to.matched.length
                          ? next()
                          : next('/login')
                      : (async () => {
                            try {
                                // 通过token重新兑换信息
                                await store.dispatch('user/getInfoAuth');
                                next({ ...to, replace: true });
                            } catch (e) {
                                // 请求失败/网络中断
                                next('/login');
                            }
                        })();
              })();
    } else {
        whiteList.indexOf(to.path) !== -1 ? next() : next('/login');
    }
}
