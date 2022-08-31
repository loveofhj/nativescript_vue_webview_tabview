import Vue from 'vue';
import Vuex from 'vuex';
import { Http } from '@nativescript/core'

Vue.use(Vuex);

const chatStore = {
    namespaced: true,
    state: {
        // 데이터 부분 vue의 data와 유사      
        history: [],
    },
    mutations: {
        // 데이터 변환 부분(데이터를 실제로 변환하는 것은 이 부분에서만 가능)      
        setHistory: function(state, history) {
            state.history = history;
        },
        insetHistory: function(state, item) {
            var tempItem = JSON.stringify({                                         
                "SAID":  item.SAID,  //대상자 연구 등록 번호
                "INVID": item.INVID, //연구자 식별 번호
                "QNADTC": item.QNADTC,  //작성일자
                "QNACONTENT": item.qnacontent  , //QnA내용
                "SUBJ_FLAG": item.SUBJ_FLAG // 대상자가 읽었느지 확인(1: 읽음, 2:안읽음)                      
            })
            state.history.push(tempItem);
        }
    },
    actions: {
        getChatInfo: function(context, params){
            return new Promise((resolve, reject) => {
                Http.request({
                    url: 'http://203.254.143.108:8003/study/qna/106',
                    method: 'POST',   
                    headers: { "Content-Type": "application/json" }, 
                    content: JSON.stringify({
                        sid: params.sid,
                        said: params.said,
                    }),                                    
                })
                .then((HttpResponse) => {
                    let response = JSON.parse(HttpResponse.content);
                    if(response.rows > 0) {
                        var jsonData =JSON.parse( JSON.stringify( HttpResponse.content ) );    
                        console.log(jsonData.output)
                        context.commit('setHistory', JSON.parse(JSON.stringify(jsonData.output)));
                    }
                    resolve(JSON.parse(HttpResponse.content));
                    console.log(JSON.parse(HttpResponse.content))
                },
                err => {
                    console.log(err)
                    reject(err);
                })
            });
        },
        insertMessage: function(context, params){
            return new Promise((resolve, reject) => {
                Http.request({
                    url: 'http://203.254.143.108:8003/study/qna',
                    method: 'POST',   
                    headers: { "Content-Type": "application/json" }, 
                    content: JSON.stringify({                        
                        said: params.said,
                        applid: params.applid,
                        qnacontent: params.qnacontent                        
                    }),                                    
                })
                .then((HttpResponse) => {                    
                    console.log("insertMessage Done!");
                    resolve(JSON.parse(HttpResponse.content));
                },
                err => {
                    reject(err);
                })
            });
        },
    },
    getters: {
        // vue의 computed와 유사
       
    }
};

export default chatStore
