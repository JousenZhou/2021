<template>
    <div class="sideBar">
        <header>
            <slot :sideStatus="sideStatus">
                <p>
                    <i class="el-icon-moon-night" />
                    <span v-if="!sideStatus">Blood_Cat</span>
                </p>
            </slot>
            <p v-show="!sideStatus">
                <el-input clearable placeholder="模糊搜索" v-model="searchValue" size="mini" :config="inputConfig" @selectSearch="select" />
            </p>
        </header>
        <el-menu
            ref="elMenu"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse-transition="false"
            background-color="#1B243B"
            class="el-menu-sideBar "
            :collapse="sideStatus"
        >
            <template v-for="item in menu">
                <el-submenu :index="item.key" v-if="isEmptyArray(item.children)">
                    <template #title>
                        <p class="el-menu-item-p">
                            <i :class="item.icon || 'el-icon-location'" icon="true" />
                            <span>{{ item.name }}</span>
                        </p>
                    </template>
                    <template v-for="(itemChildren, indexOF) in item.children">
                        <el-submenu :title="itemChildren.name" v-if="isEmptyArray(itemChildren.children)" :key="indexOF" :index="itemChildren.key">
                            <p class="el-menu-item-p" slot="title">
                                <span>{{ itemChildren.name }}</span>
                            </p>
                            <el-menu-item
                                :index="String(itemChildren.key)"
                                v-for="itemC in itemChildren.children"
                                @click.native="toRouterLink(itemC)"
                            >
                                <p slot="title" class="el-menu-item-span">
                                    {{ itemC.name }}
                                </p>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="String(itemChildren.key)" @click.native="toRouterLink(itemChildren)">
                            <p slot="title" class="el-menu-item-span">
                                {{ itemChildren.name }}
                            </p>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item v-else :index="String(item.key)" @click.native="toRouterLink(item)">
                    <p class="el-menu-item-p">
                        <i icon="true" :class="item.icon || 'el-icon-location'"></i>
                        <span slot="title">{{ item.name }}</span>
                    </p>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { Options, mixins } from 'vue-class-component';
import { Watch } from '@/decorator/watch';
import { mapState } from 'vuex';
@Options({
    name: 'routeMenuAuth',
    components: {},
    computed: mapState({
        sideStatus: (state) => {
            return state.routeMenuAuth.sideStatus;
        },
        menu: (state) => state.routeMenuAuth.menu
    })
})
export default class App extends mixins() {
    index = null;
    // 菜单搜索的值
    searchValue = '';
    // 输入框配置
    inputConfig = {
        type: 'search',
        options: []
    };
    // 当前路由地址
    get routerLink() {
        return this.$route.value.path;
    }
    @Watch('routerLink')
    onRouterChange(router) {
        const target = this.matchRoute(this.menu, router);
        if (!this.sideStatus && target && target.key !== this.index) {
            this.index = target.key;
            target.parentId && this.$refs['elMenu'].open(target.parentId);
        }
    }
    @Watch('menu', { immediate: true })
    onRouterListChange(routerArray) {
        this.inputConfig.options = this.restructureSearchList(routerArray);
    }
    // 路由构筑检索项
    restructureSearchList(routerArray, parentName = '') {
        return routerArray.reduce((x, y) => {
            if (y.children && y.children.length) {
                return [...x, ...this.restructureSearchList(y.children, parentName ? `${parentName} > ${y.name}` : y.name)];
            } else {
                return [...x, ...[{ value: y.path, label: parentName ? `${parentName} > ${y.name}` : y.name }]];
            }
        }, []);
    }
    // 匹配路由地址
    matchRoute(routerArray, routerLink) {
        for (let a = 0; a < routerArray.length; a++) {
            const y = routerArray[a];
            if (y.children && y.children.length) {
                const res = this.matchRoute(y.children, routerLink);
                if (res) {
                    return res;
                }
            } else if (y.path === routerLink) {
                return y;
            }
        }
    }
    // 路由跳转
    toRouterLink(router) {
        const { path, index } = router;
        if (path !== this.routerLink && path) {
            this.$router.push(path);
            this.index = index;
        }
    }
    // 是否数组/是否空
    isEmptyArray(value) {
        return Array.isArray(value) && value.length;
    }
    // 搜索检索
    select(row) {
        this.routerLink !== row.value && this.$router.push(row.value);
    }
}
</script>
<style lang="scss" scoped>
.sideBar {
    background: #020c26;
    height: 100%;
    display: flex;
    flex-direction: column;
    header {
        p {
            height: 56px;
            &:nth-of-type(1) {
                font-style: italic;
                color: rgba(255, 255, 255, 0.86);
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &:nth-of-type(2) {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 8%;
                max-width: 151.2px;
            }
        }
    }
    .el-menu-item-span {
        /*padding-left: 48px;*/
        width: calc(100% - 48px);
        height: 100%;
        display: inline-block;
    }
    .el-menu-item-p {
        span {
            width: 100%;
            display: inline-block;
        }
        /*padding-left: 20px;*/
    }
}
</style>
<style lang="scss">
.sideBar {
    .el-menu {
        border: none;
    }
    .el-menu-sideBar {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 2px;
            height: 2px;
        }

        /*滚动条的轨道*/
        &::-webkit-scrollbar-track {
            background-color: rgb(27, 36, 59);
        }

        /*滚动条里面的小方块，能向上向下移动*/
        &::-webkit-scrollbar-thumb {
            background-color: rgb(27, 36, 59);
            border-radius: 5px;
            border: 1px solid rgb(27, 36, 59);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: rgb(27, 36, 59);
        }

        &::-webkit-scrollbar-thumb:active {
            background-color: rgb(27, 36, 59);
        }

        /*边角，即两个滚动条的交汇处*/
        &::-webkit-scrollbar-corner {
            background-color: rgb(27, 36, 59);
        }
    }
    .el-menu-sideBar:not(.el-menu--collapse) {
        padding: 0 10px;
        width: 160px;
        min-height: 400px;
        /*> .el-menu-item:first-child {*/
        /*    margin: 0px 6px;*/
        /*}*/
    }
    .el-submenu .el-menu-item {
        /*min-width: auto !important;*/
    }
    .el-menu-item,
    .el-submenu__title {
        height: 42px !important;
        line-height: 42px !important;
        font-size: 13px;
    }
    header {
        .el-input__inner {
            background: #37466c;
            border: none;
            outline: none;
            font-size: 12px;
            color: white;
        }
    }
    .el-submenu {
        box-sizing: border-box;
        border-radius: 5px;
        margin: 4px 0;
    }
    .is-opened {
        background: rgba(255, 255, 255, 0.04) !important;
        div,
        ul,
        li {
            width: 100%;
            background: none !important;
        }
        [aria-expanded='true'] {
            margin: 4px 6px;
            width: auto !important;
            background: rgba(255, 255, 255, 0.04) !important;
            > div,
            ul {
                text-indent: -3px;
            }
        }
    }
    [aria-expanded='true'] {
        [icon='true'] {
            color: #ffa914;
        }
    }
}
/*侧面弹出来的*/
.el-menu--vertical {
    .el-menu {
        /*min-width: auto; */
        max-width: 160px;
        li,
        .el-submenu__title {
            /*width: 160px !important;*/
            height: 48px !important;
            line-height: 48px !important;
        }
    }
}
.el-autocomplete-suggestion {
    padding-bottom: 10px;
    li {
        font-size: 12px;
        height: 28px;
        line-height: 28px;
    }
}
</style>
