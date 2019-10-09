<template>
    <div class="right slider">
        <img class="right-logo"
             src="./../assets/userLogo.jpeg"
             alt="">
        <div class="title">夜尽天明</div>
        <div class="right-content">
            <div class="item">
                <div class="num">123</div>
                粉丝
            </div>
            <div class="item">
                <div class="num">123</div>
                文章
            </div>
            <div class="item">
                <div class="num">123</div>
                字数
            </div>
            <div class="item">
                <div class="num">123</div>
                收获喜欢
            </div>
        </div>
        <div class="tags">
            <div class="title">标签云</div>
            <router-link v-for="item in list"
                         class="item"
                         :key="item._id"
                         :to="`/articles?tag_id=${item._id}&tag_name=${item.name}&category_id=`">
                <span :key="item._id">{{item.name}}</span>
            </router-link>
        </div>
        <div class="introduce">
            <div class="title">技术以内的 BB</div>
            <div class="content">
                <img style="width:100%;"
                     src="./../assets/BiaoChenXuYing.png"
                     alt="全栈修炼"/>
            </div>
        </div>
        <div class="introduce">
            <div class="title">技术以外的 BB</div>
            <div class="content">
                <img style="width:100%;"
                     src="./../assets/YingHeZaHuoPu.png"
                     alt="硬核杂货铺"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class Slider extends Vue {
        list: Array<object> =
            [{
                "_id": "5cf37d2874289f3d47ed1468",
                "name": "数据结构与算法"
            }, {
                "_id": "5cd6929974289f3d47ed13e8",
                "name": "vue-router"
            }, {
                "_id": "5cab59b566f24111e0f2ee59",
                "name": "理财"
            }, {
                "_id": "5c8cadaeb87b8a04f1860c9e",
                "name": "performance"
            }, {
                "_id": "5bf4b78a245730373274df59",
                "name": "浏览器内核"
            }, {
                "_id": "5bf405e1245730373274df55",
                "name": "react.js"
            }, {
                "_id": "5bf405d6245730373274df54",
                "name": "vue.js"
            }, {
                "_id": "5bf01438bc1e7805eb83dba3",
                "name": "简历"
            }, {
                "_id": "5bf01431bc1e7805eb83dba2",
                "name": "关于博主"
            }, {
                "_id": "5bf01425bc1e7805eb83dba1",
                "name": "vuex"
            }, {
                "_id": "5bf0141cbc1e7805eb83dba0",
                "name": "webpack"
            }, {
                "_id": "5bf013dcbc1e7805eb83db9e",
                "name": "mongodb"
            }, {
                "_id": "5bf013d2bc1e7805eb83db9d",
                "name": "随笔"
            }, {
                "_id": "5bf013c2bc1e7805eb83db9b",
                "name": "express"
            }, {
                "_id": "5bf013bbbc1e7805eb83db9a",
                "name": "node"
            }, {
                "_id": "5bf013a6bc1e7805eb83db97",
                "name": "javaScript"
            }];
    }
</script>

<style lang="less" scoped>
.right-logo{
    width: 100px;
}
</style>
