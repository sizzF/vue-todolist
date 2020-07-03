import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainTodoLists: [],
    viewTodoLists: [],
});

export const mutations = {
    addTodoList(state, payload) {
        state.mainTodoLists.unshift(payload);
    },
    getTodoLists(state, payload) {
        let tempList = [];
        state.mainTodoLists.forEach(v => {
            const startDate = v.startDate.substr(0,4)*10000+v.startDate.substr(5,2)*100+v.startDate.substr(8,2);
            const endDate = v.endDate.substr(0,4)*10000+v.endDate.substr(5,2)*100+v.endDate.substr(8,2);
            const date = payload.date.substr(0,4)*10000+payload.date.substr(5,2)*100+payload.date.substr(8,2);
            if(startDate<=date && date<=endDate){
                tempList.push(v);
            }
        });
        state.viewTodoLists=tempList;
    },
    finishTodoList(state, payload) {
        //const index = state.mainTodoLists.findIndex(v => v.id === payload.todoId);
        state.mainTodoLists[payload.todoId].finish = true;
    },
    unFinishTodoList(state, payload) {
        //const index = state.mainTodoLists.findIndex(v => v.id === payload.todoId);
        state.mainTodoLists[payload.todoId].finish = false;
    },
    removeTodoList(state, payload) {
        //const index = state.mainTodoLists.findIndex(v => v.id === payload.todoId);
        state.mainTodoLists.splice(payload.todoId, 1);
    }
};

export const actions = {
    async getTodoLists({ commit }, payload) {
        try {
            //await this.$axios.get();
            commit('getTodoLists', payload);
        } catch (error) {
            console.error(error);
        }
    },
    async finishTodoList({ commit }, payload) {
        try {
            //await this.$axios.patch();
            commit('finishTodoList', payload);
        } catch (error) {
            console.error(error);
        }
    },
    async unFinishTodoList({ commit }, payload) {
        try {
            //await this.$axios.patch();
            commit('unFinishTodoList', payload);
        } catch (error) {
            console.error(error);
        }
    },
    async removeTodoList({ commit }, payload) {
        try {
            //await this.$axios.delete();
            commit('removeTodoList', payload);
        } catch (error) {
            console.error(error);
        }
    }
};