import { menu } from '@/until/customPlugin/routeMenuAuth/index';
import localstorage from '@/until/localstorage';

const state = {
    token: localstorage.get('token'),
    userName: '',
    permissionList: []
};
const mutations = {
    SET_SIDE_STATUS: function(state, sideStatus) {
        state.sideStatus = sideStatus;
    },
    SET_PERMISSION: function(state, permissionList) {
        state.permissionList = permissionList;
    },
    SET_INFO: function(state, info) {
        const { authRouter, token, userName } = info;
        // 解析权限路由 动态生成路由跟菜单【这里因业务而异，具体自己来决定】
        state.token = token;
        state.userName = userName;
        localstorage.set('token', token);
        menu.accept(authRouter);
    }
};
const actions = {
    getInfoAuth: async ({ commit }) => {
        let res = {
            code: 0,
            data: {
                userName: 'BloodCat',
                token: '7462384263467324',
                authRouter: [
                    {
                        id: 900000,
                        parentId: 0,
                        name: '开发展示',
                        icon: 'el-icon-s-home',
                        moduleId: ''
                    },
                    {
                        id: 900001,
                        parentId: 900000,
                        name: '主题',
                        moduleId: '120001'
                    }
                ]
            }
        };
        commit('SET_INFO', res.data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
