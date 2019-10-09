<template>
    <div class="nav">
        <el-row :gutter="26">
            <el-col :span="3">
                <img src="./../assets/logo.png" alt="" class="logo">
            </el-col>
            <el-col :span="16">
                <el-menu :router="true"
                         :default-active="activeIndex"
                         active-text-color="#409eff"
                         class="el-menu-demo"
                         mode="horizontal"
                         @select="handleSelect">
                    <el-menuItem :route="l.path"
                                 :index="l.index"
                                 v-for="l in list"
                                 :key="l.index">
                        {{l.name}}
                    </el-menuItem>
                </el-menu>
            </el-col>
            <el-col :span="5">
                <el-button type="primary">登录</el-button>
                <el-button type="primary">注册</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component
    export default class Nav extends Vue {
        list: Array<object> = [
            {
                index: "1",
                path: "/",
                name: "首页"
            },
            {
                index: "2",
                path: "/articles",
                name: "文章"
            },
            {
                index: "3",
                path: "/archive",
                name: "归档"
            },
            {
                index: "4",
                path: "/project",
                name: "项目"
            },
            {
                index: "5",
                path: "/timeline",
                name: "历程"
            },
            {
                index: "6",
                path: "/message",
                name: "留言"
            },
            {
                index: "7",
                path: "/about",
                name: "关于"
            }
        ];
        @Prop({
            type:String,
            default:'1'
        }) activeIndex!:string;
        handleSelect(){

        }
    }
</script>

<style lang="less" scoped>
    .logo{
        width: 60px;
    }
</style>
