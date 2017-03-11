/**
 * Created by ASUS on 2017/3/11.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import index from '../app/index.vue';
import a from '../app/a.vue'

export default new VueRouter({
    routes:[{
        path:'/',
        component:index
    },{
        path:'/a',
        component:a
    }]
})