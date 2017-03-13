/**
 * Created by ASUS on 2017/3/11.
 */
import Vue from 'vue';
import Weui from 'weui';
Vue.use(Weui);
// import index from './app/index.vue';
import router from './router/router.js';
import VueResource from 'vue-resource'
Vue.use(VueResource)
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        search:''
    },
    mutations:{
        setSearch:function(state,data){
            state.search = data;
        }
    }
})

new Vue({
    router,
    store
}).$mount('#demo')