import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
    mainTodoLists: [],

});

export const mutations = {
    addTodoList(state, payload) {
        state.mainTodoLists.unshift(payload);
    },
};

export const acations = {
    
};