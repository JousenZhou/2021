<template>
    <div class="layout-control">
        <div>
            <i v-if="development" :class="sideStatus ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toSwitch" />
            <slot />
        </div>
        <div></div>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'layout-control',
    components: {}
})
export default class App extends mixins() {
    get sideStatus() {
        return this.$menu.state.sideStatus;
    }
    get development() {
        return process.env.NODE_ENV === 'development' ? true : !window.ip;
    }
    toSwitch() {
        this.$menu.switch()();
    }
    toHome() {
        this.$router.push({ path: '/erp/home' });
    }
    loginOut() {
        localStorage.removeItem('token');
        this.$menu.clear();
        this.$router.push({ path: '/login' });
    }
    mounted() {}
    created() {}
}
</script>

<style scoped lang="scss">
.layout-control {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 0 40px 0 10px;*/
    i {
        font-size: 20px;
        cursor: pointer;
    }
    .userName {
        cursor: pointer;
        font-size: 14px;
        color: #24283f;
        display: flex;
        align-items: center;
        i {
            color: #474747;
            margin-right: 6px;
        }
    }
    div {
        &:nth-of-type(1) {
            flex: 1;
            display: flex;
            align-items: center;
        }
    }
}
</style>
