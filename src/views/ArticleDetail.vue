<template>
    <div class="article-detail">
        <h1>我大萨达撒多文章的详情</h1>
        <div v-html="content"></div>
    </div>
</template>

<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    @Component
    export default class ArticleDetail extends Vue{
        content:string='<p>文章的详情</p>'
    }
</script>

<style scoped>

</style>
