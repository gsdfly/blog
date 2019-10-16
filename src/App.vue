<template>
  <div id="app">
    <el-container v-if="!isHome">
      <el-header>
        <Nav :activeIndex="activeIndex"/>
      </el-header>
      <el-container>
        <el-main style="background: pink">
          <router-view/>
        </el-main>
        <el-aside width="200px" v-if="!isArticleDetail">
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
#app{
  width: 1200px;
  margin: 0 auto;
}
</style>
