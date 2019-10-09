<template>
  <div class="home">
    <h1>我的博客</h1>
    <button @click="goArticle">去看文章</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class Home extends Vue {
    goArticle(){
      this.$router.push('articles')
    }
  }
</script>
