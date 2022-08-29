import Vue from 'nativescript-vue'

import store from './store/index'
import tabview from './components/tabview'


Vue.registerElement('LineChart', () => require('@nativescript-community/ui-chart/charts').LineChart);  


new Vue({
  store,
  render: (h) =>  h(tabview), //h('frame', [h(Home)]),
}).$start()
