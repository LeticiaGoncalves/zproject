import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import './index.css'
import VueCurrencyInput from 'vue-currency-input'
import VueTheMask from 'vue-the-mask' //https://vuejs-tips.github.io/vue-the-mask/
import VCalendar from 'v-calendar';
import Vuelidate from 'vuelidate';
import Register from './components/Register.vue'
import Home from './components/Home.vue'



Vue.use(VueRouter);
Vue.use(Vuelidate);




const pluginOptions = {
  /* see config reference */
  globalOptions: {
  locale: 'pt-br',
  currency: 'BRL',
  valueAsInteger: false,
  distractionFree: false,
  precision: 2,
  autoDecimalMode: true,
  valueRange: { min: 0 },
  allowNegative: false }
}

Vue.use(VueCurrencyInput, pluginOptions)
Vue.config.productionTip = false
Vue.use(VueTheMask)

// Use vc-calendar & vc-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

const routes = [
  { path:'/', component: Home },
  { path:'/home', component: Home },
  { path:'/register', component: Register }
]

const router = new VueRouter ({
  routes: routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
