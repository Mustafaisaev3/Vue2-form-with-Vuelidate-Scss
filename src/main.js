import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import mask from './directives/MaskDirective/mask'

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.directive('mask', mask);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
