// 플러그인 호출
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        completed: '',
        year: '',
        month: '',
        day:'',
        item:'',
    },
    getters:{
       
    },
    mutations : {
        
    },
    actions : {
        
    }
});