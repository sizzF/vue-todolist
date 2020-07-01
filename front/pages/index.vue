<template>
    <div>
        <v-container>
            <div>
                <todo-card v-for="(todo, idx) in mainTodoLists" :key="idx" :todo="todo" />
            </div>
        </v-container>
    </div>
</template>

<script>
import TodoCard from '~/components/TodoCard';
import { mapState } from 'vuex';

export default {
    components: {
        TodoCard
    },

    computed: {
        ...mapState('todolists', ['mainTodoLists']),
    }
}
</script>

<style>

</style>