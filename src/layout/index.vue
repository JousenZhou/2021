<template>
    <div class="layout">
        <div class="layout-left">
            <menu-auth />
        </div>
        <div class="layout-right">
            <header>
                <layout-control :style="{ display: development || cache.length > 1 ? 'block' : 'none' }">
                    <tags-view :routes="routes" />
                </layout-control>
            </header>
            <section>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </section>
        </div>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
import { baseRouter } from '@/router';
import layoutControl from './components/control';
@Options({
    name: 'Layout',
    components: {
        layoutControl
    }
})
export default class App extends mixins() {
    routes = baseRouter;
    get development() {
        return process.env.NODE_ENV === 'development' ? true : !window.ip;
    }
    get cache() {
        return this.$store.state['tagsView']['cachedViews'];
    }
}
</script>

<style scoped lang="scss">
.layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    .layout-right {
        flex: 1;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        header {
            background: white;
            /*border-bottom: rgba(227, 227, 227, 0.65) 1px solid;*/
        }
        section {
            background: white;
            flex: 1;
            overflow: hidden;
        }
    }
}
</style>
