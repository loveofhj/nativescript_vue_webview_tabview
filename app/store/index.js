import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//작성한 모듈 가져오기
import tabview from './module/tabviewStore'


export default new Vuex.Store({
    modules:{ 
        tabview: tabview,  
        
    },
});




