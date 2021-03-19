<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'App'
})
export default class App extends mixins() {}
</script>
<style lang="scss">
*::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/*滚动条的轨道*/
*::-webkit-scrollbar-track {
    background-color: #ffffff;
}

/*滚动条里面的小方块，能向上向下移动*/
*::-webkit-scrollbar-thumb {
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

*::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8;
}

*::-webkit-scrollbar-thumb:active {
    background-color: #787878;
}

/*边角，即两个滚动条的交汇处*/
*::-webkit-scrollbar-corner {
    background-color: #ffffff;
}
</style>
