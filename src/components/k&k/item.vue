<template>
    <div class="item">
        <span>123</span>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
@Options({
    name: 'item'
})
export default class App extends mixins() {}
</script>
<style lang="scss" scoped></style>
