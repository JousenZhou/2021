import { authRouteMenu } from '@/until/toolClass';

const state = {
    menu: [],
    routeAuth: [],
    sideStatus: false
};
const mutations = {
    SET_SIDE_STATUS: function(state, sideStatus) {
        state.sideStatus = typeof sideStatus === 'boolean' ? sideStatus : !state.sideStatus;
    },
    SET_ROUTE_AUTH: function(state, auth) {
        state.routeAuth = auth;
        state.menu = authRouteMenu(auth);
    }
};
const actions = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
