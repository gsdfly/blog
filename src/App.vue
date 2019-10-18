<template>
  <div id="app">
    <el-container v-if="!isHome">
      <el-header>
        <Nav :activeIndex="activeIndex"/>
      </el-header>
      <el-container style="margin: 60px 0 0  0">
        <el-main>
          <router-view/>
        </el-main>
        <el-aside width="300px" v-if="!isArticleDetail">
          <Slider/>
        </el-aside>
      </el-container>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>
<script lang="ts">
  import Nav from "@/components/nav.vue";
  import Footer from "@/components/footer.vue";
  import Slider from "@/components/slider.vue";

  import {Vue,Component,Watch} from "vue-property-decorator";
  import {
    State,
    Getter,
    Action,
    Mutation,
  } from 'vuex-class'

  @Component({
    components:{
      Nav,
      Footer,
      Slider
    }
  })
  export default class App extends Vue{
    isArticleDetail:boolean=false;
    activeIndex:string = '1';
    @State('isHome') isHome!:boolean;
    @Mutation('changeIsHome') changeIsHome!:(flag:boolean)=>{};
    mounted(){
      this.changeRoute();
    }
    @Watch("$route")
    changeRoute(){
      this.activeIndex = String(this.$route.meta.activeIndex);
      if(this.$route.path === '/'){
        this.changeIsHome(true);
      }else {
        if(this.$route.name === 'articleDetail'){
          this.isArticleDetail=true;
        }else {
          this.isArticleDetail=false;
        }
        this.changeIsHome(false);
      }
    }


  }
</script>
<style lang="less">
  @import "less/index";
  #app{
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
  }
  .el-header{
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #F0F0F0;
    background: #fff;
    z-index: 999;
    left: 0;
    top: 0;
  }
</style>
