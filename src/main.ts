import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
  Menu,
  MenuItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Timeline,
  TimelineItem,
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Tree
} from "element-ui";

// 按需引用 element 组件
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Timeline.name, Timeline);
Vue.component(TimelineItem.name, TimelineItem);
Vue.component(Card.name, Card);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Tree.name, Tree);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
