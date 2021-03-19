<template>
    <div class="custom-Layout" id="custom-layout">
        <div :style="{ width: `${matrixW * spacing}px` }">
            <template v-for="index in parseInt(layoutHeight / matrixW)">
                <i
                    :key="index2"
                    :style="{ top: `${spacing * index}px`, left: `${spacing * index2}px` }"
                    class="layout-point"
                    v-for="index2 in matrixW"
                />
            </template>
            <slot :matrixW="matrixW" :spacing="spacing" />
        </div>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'custom-Layout'
})
export default class App extends mixins() {
    // 高度
    layoutHeight = 200;
    // 横向矩阵
    matrixW = 24;
    // 矩阵间距
    spacing = 0;
    mounted() {
        let width = document.getElementById('custom-layout').offsetWidth;
        this.spacing = width / this.matrixW;
        window.onresize = () => {
            let width = document.getElementById('custom-layout').offsetWidth;
            this.spacing = width / this.matrixW;
        };
    }
}
</script>
<style lang="scss" scoped>
.custom-Layout {
    width: calc(100% - 20px);
    overflow: auto;
    background: #ffffff;
    position: relative;
    margin: 10px;
    border: 1px #000000 dashed;
    height: calc(100% - 20px);
    .layout-point {
        position: absolute;
        display: inline-block;
        width: 4px;
        height: 4px;
        background: rgb(81, 216, 249);
    }
}
</style>
