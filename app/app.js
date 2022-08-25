import Vue from 'nativescript-vue'

import store from './store/index'
import tabview from './components/tabview'

new Vue({
  store,
  render: (h) =>  h(tabview), //h('frame', [h(Home)]),
}).$start()
