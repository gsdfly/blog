import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        activeIndex:1
      }
    },
    {
      path: '/articles',
      name: 'articles',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Articles.vue'),
      meta:{
        activeIndex:2
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import(/* webpackChunkName: "about" */ './views/Archive.vue'),
      meta:{
        activeIndex:3
      }
    },
    {
      path: '/project',
      name: 'project',
      component: () => import(/* webpackChunkName: "about" */ './views/Project.vue'),
      meta:{
        activeIndex:4
      }
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import(/* webpackChunkName: "about" */ './views/Timeline.vue'),
      meta:{
        activeIndex:5
      }
    },
    {
      path: '/message',
      name: 'message',
      component: () => import(/* webpackChunkName: "about" */ './views/Message.vue'),
      meta:{
        activeIndex:6
      }
    },

    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta:{
        activeIndex:7
      }
    },

    {
      path: '/articleDetail/:id?',
      name: 'articleDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/ArticleDetail.vue'),
    },
  ],
});
