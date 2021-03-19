<template>
    <background>
        <item />
    </background>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
import background from '@/components/k&k/background';
import item from '@/components/k&k/item';
@Options({
    name: 'k&k',
    components: { background, item }
})
export default class App extends mixins() {}
</script>
<style lang="scss" scoped></style>
