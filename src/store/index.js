import { createStore } from 'vuex';
import requireContext from '@/until/requireContext';
const mir = requireContext(require.context('./modules', true, /\.js$/));
export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: mir
});
