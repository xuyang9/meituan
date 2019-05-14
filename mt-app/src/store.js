import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    position: {},
    userName: null
};

const mutations = {
    setUserName (state, value){
        state.userName = value;
    },
    setPosition (state, value) {
        state.position = value;
    }
    
};

const actions = {
    setPosition ({ commit } , value) {
        //异步请求后端获取当前位置的数据
        commit('setPosition', value);
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});