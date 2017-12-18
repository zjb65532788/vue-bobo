// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Dialog from './components/dialog';
import Button from './components/button';
import ClipperImage from './components/clipperImage';

require('./css/reset.css');
require('./css/iconfont1.css');
require('./css/iconfont.css');

Vue.component('bobo-dialog', Dialog);
Vue.component('bobo-button', Button);
Vue.component('bobo-clipper', ClipperImage);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
