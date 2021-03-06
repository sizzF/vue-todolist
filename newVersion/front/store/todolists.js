import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainTodoLists: [],
    findDate: '',
});

export const mutations = {
    addTodoList(state, payload) {
        state.mainTodoLists.unshift(payload);
    },
    getTodoLists(state, payload) {
        state.mainTodoLists=payload.data;
        state.findDate=payload.findDate;
    },
    finishTodoList(state, payload) {
        const index = state.mainTodoLists.findIndex(v => v.id === payload.id);
        Vue.set(state.mainTodoLists[index], 'finish', true);
    },
    unFinishTodoList(state, payload) {
        const index = state.mainTodoLists.findIndex(v => v.id === payload.id);
        Vue.set(state.mainTodoLists[index], 'finish', false);
    },
    removeTodoList(state, payload) {
        const index = state.mainTodoLists.findIndex(v => v.id === payload.id);
        state.mainTodoLists.splice(index, 1);
    }
};

export const actions = {
    addTodoList: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.post('/todoList', {
                content: payload.content,
                type: payload.type,
                startDate: payload.startDate,
                finish: payload.finish,
            }, {
                withCredentials: true
            });
            commit('addTodoList', res.data);
        } catch (error) {
            console.error(error);
        }
    }, 1000),

    getTodoLists:throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.get(`/todoList?findDate=${payload.date}`, {
                withCredentials: true
            });
            commit('getTodoLists', {
                data: res.data,
                findDate: payload.date,
            });
        } catch (error) {
            console.error(error);
        }
    }, 1000),

    finishTodoList: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.patch('/todolist/finish',{
                id: payload.id,
            },{
                withCredentials: true
            });
            commit('finishTodoList', res.data);
        } catch (error) {
            console.error(error);
        }
    }, 1000),

    unFinishTodoList: throttle(async function({ commit }, payload) {
        try {
            const res = await this.$axios.patch('/todolist/unfinish',{
                id: payload.id,
            },{
                withCredentials: true
            });
            commit('unFinishTodoList', res.data);
        } catch (error) {
            console.error(error);
        }
    }, 1000),

    removeTodoList: throttle(async function({ commit }, payload) {
        try {
            await this.$axios.delete(`/todolist/${payload.id}`,{
                withCredentials: true,
            });
            commit('removeTodoList', payload);
        } catch (error) {
            console.error(error);
        }
    }, 1000),
};