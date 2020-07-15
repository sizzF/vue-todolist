import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainDailyNotes: [],
});

export const mutations = {
    addDailyNote(state, payload) {
        state.mainDailyNotes.unshift(payload);
    },
    getDailyNotes(state, payload) {
        state.mainDailyNotes=payload.data;
    },
    removeDailyNote(state, payload) {
        const index = state.mainDailyNotes.findIndex(v => v.id === payload.id);
        state.mainDailyNotes.splice(index, 1);
    },
    modifyDailyNote(state, payload) {
        const index = state.mainDailyNotes.findIndex(v => v.id === payload.id);
        Vue.set(state.mainDailyNotes[index], 'weather', payload.weather);
        Vue.set(state.mainDailyNotes[index], 'content', payload.content);
        Vue.set(state.mainDailyNotes[index], 'updatedAt', payload.updatedAt);
    }
};

export const actions = {
    addDailyNote: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.post('/dailynote', {
                content: payload.content,
                weather: payload.weather,
                date: payload.date,
            }, {
                withCredentials: true
            });
            commit('addDailyNote', res.data);
        } catch (error) {
            console.error(error);
        }
    }, 3000),
    getDailyNotes:throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.get(`/dailynote?findDate=${payload.date}`, {
                withCredentials: true
            });
            commit('getDailyNotes', {
                data: res.data,
                findDate: payload.date,
            });
        } catch (error) {
            console.error(error);
        }
    }, 1000),
    removeDailyNote: throttle(async function({ commit }, payload) {
        try {
            await this.$axios.delete(`/dailynote/${payload.id}`,{
                withCredentials: true,
            });
            commit('removeDailyNote', payload);
        } catch (error) {
            console.error(error);
        }
    }, 1000),
    modifyDailyNote: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.patch('/dailynote', {
                id: payload.id,
                content: payload.content,
                weather: payload.weather,
            }, {
                withCredentials: true
            });
            console.log(res);
            commit('modifyDailyNote', res.data);
        }catch(err){
            console.error(err);
            alert(err.response.data);
        }
    }, 5000),
};