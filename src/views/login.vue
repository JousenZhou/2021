<template>
    <div class="about">
        <h1>login</h1>
        <el-button @click="test">点击</el-button>
    </div>
</template>
<script>
// import { Prop } from '@/decorator/prop';
// import { Watch } from '@/decorator/watch';
// import { Setup } from '@/decorator/setup';
import localstorage from '@/until/localstorage';
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'login'
})
export default class App extends mixins() {
    test() {
        localstorage.set('token', 'bloodCat');
        this.$router.replace({
            path: `/erp/${'120001'}`
        });
    }
}
</script>
