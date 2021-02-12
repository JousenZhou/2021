<template>
    <div id="app">
        {{ msg }}
    </div>
</template>

<script>
import { Prop } from '@/decorator/prop';
// import { Watch } from '@/decorator/watch';
// import { Setup } from '@/decorator/setup';
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'test'
})
export default class App extends mixins() {
    @Prop({ required: true }) msg;
    mounted() {
        // this.$kms();
    }
}
</script>
