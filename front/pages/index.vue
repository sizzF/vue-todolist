<template>
    <div>
        <v-container>
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="조회"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                />
                </template>
                <v-date-picker
                v-model="date"
                class="mt-4"
                no-title
                scrollable
                >
                <v-spacer />
                <v-btn text color="primary" @click="chageDate(date)">확인</v-btn>
                </v-date-picker>
            </v-menu>
            <div>
                <!--<draggable v-model="viewTodoLists" group="todoList" @start="drag=true" @end="drag=false">-->
                <todo-card v-for="(todo, index) in viewTodoLists" :key="index" :todo="todo" :index="index" />
                <!--</draggable>-->

            </div>
        </v-container>
    </div>
</template>

<script>
import TodoCard from '~/components/TodoCard';
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
export default {
    middleware: 'authenticated',
    components: {
        TodoCard,
        //draggable
    },
    fetch({ store }) {
        return Promise.all([
            store.dispatch('users/loadUser'),
            store.dispatch('todolists/getTodoLists', {date: new Date().toISOString().substr(0, 10)}),
        ]);
    },
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
        }
    },
    computed: {
        ...mapState('todolists', ['mainTodoLists']),
        viewTodoLists(){
            let tempList = [];
            this.mainTodoLists.forEach(v => {
                const startDate = v.startDate.substr(0,4)*10000+v.startDate.substr(5,2)*100+v.startDate.substr(8,2);
                const endDate = v.endDate.substr(0,4)*10000+v.endDate.substr(5,2)*100+v.endDate.substr(8,2);
                const date = this.date.substr(0,4)*10000+this.date.substr(5,2)*100+this.date.substr(8,2);
                if(startDate<=date && date<=endDate){
                    tempList.push(v);
                }
            });
            return tempList;
        },
    },
    methods: {
        async chageDate(date) {
            try {
                this.$refs.menu.save(date);
                await this.$store.dispatch('todolists/getTodoLists', {
                    date: date,
                });
            } catch (error) {
                console.error(error);
            }

        }
    },
}
</script>

<style>

</style>