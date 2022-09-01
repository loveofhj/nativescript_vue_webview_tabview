import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//작성한 모듈 가져오기
import tabview from './module/tabviewStore'
import chat from './module/chatStore'

import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);

export default new Vuex.Store({
    modules:{ 
        tabview: tabview,  
        chat: chat,        
    },
});




