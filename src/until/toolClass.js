/**
 * @Description:工具类
 * @author BloodCat(JousenZhou)
 * @date 2020/10/25
 */
import router, { businessRoute, baseRouter } from '@/router';

// 权限路由【动态】+ 生成菜单
export function authRouteMenu(routerArray) {
    function searchTarget(array, parentId) {
        for (let a = 0; a < array.length; a++) {
            const e = array[a];
            if (e.id === parentId) {
                return e;
            } else if (e.children.length) {
                let ax = searchTarget(e.children, parentId);
                if (ax) return ax;
            }
        }
    }
    const route = [];
    let layout = baseRouter.find((em) => {
        return em.name === 'Layout';
    });
    if (layout) {
        // 构建菜单
        const menu = routerArray.reduce((x, y) => {
            const em = {
                ...y,
                children: [],
                key: y.id.toString(),
                path: `${layout.path}/${y.moduleId}`
            };
            // 有匹配的模块则挂载/没有则挂一个占位
            route.push(businessRoute[y.moduleId] ? { ...businessRoute[y.moduleId], path: y.moduleId } : { name: y.moduleId, path: y.moduleId });
            if (y.parentId) {
                const item = searchTarget(x, y.parentId);
                item && item.children.push(em);
                return x;
            } else {
                return [...x, ...[em]];
            }
        }, []);
        layout = { ...layout, children: [...layout.children, ...route] };
        router.addRoute(layout);
        return [
            {
                name: '审核台',
                path: '/erp/home',
                icon: 'el-icon-s-home',
                key: 10086,
                id: 10086
            },
            ...menu
        ];
    }
    !layout && console.error('检测不到Layout基础模块');
    return [];
}
