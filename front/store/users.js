import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    me: null,
});

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    }
};

export const actions = {
    signUp: throttle(async function({ commit }, payload) {
        try {
            /*const res = await this.$axios.post('/signup', {
                id: payload.id,
                password: payload.password,
                nickname: payload.nickname,
            }, {
                withCredentials: true
            });*/
            commit('setMe', payload);
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
    login: throttle(async function({ commit }, payload) {
        try {
            /*const res = await this.$axios.post('/signup', {
                id: payload.id,
                password: payload.password,
            }, {
                withCredentials: true
            });*/
            commit('setMe', payload);
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
    logout: throttle(async function({ commit }) {
        try {
            /*const res = await this.$axios.post('/logout', {}, {
                withCredentials: true
            });*/
            commit('setMe', null);
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),

};