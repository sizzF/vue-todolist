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
            const res = await this.$axios.post('/user', {
                id: payload.id,
                password: payload.password,
                nickname: payload.nickname,
            }, {
                withCredentials: true
            });
            console.log(res);
            return true;
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
    login: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.post('/user/login', {
                id: payload.id,
                password: payload.password,
            }, {
                withCredentials: true
            });
            commit('setMe', res.data);
            return true;
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
    logout: throttle(async function({ commit }) {
        try {
            const res = await this.$axios.post('/user/logout', {}, {
                withCredentials: true
            });
            commit('setMe', null);
            return true;
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
    async loadUser({ commit }) {
        try {
            const res = await this.$axios.get('/user',{
                withCredentials: true,
            });
            console.log(res);
            commit('setMe', res.data);
            return true;
        } catch (err) {
            console.error(err);
            //    alert(err.response.data);
        }

    },
};