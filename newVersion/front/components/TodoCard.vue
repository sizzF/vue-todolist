<template>
    <v-container>
        <v-card :style="[todo.finish ? {'backgroundColor': cardFinishColor, 'color': 'white' } : {'backgroundColor': cardColor, 'color': 'black' }]">
            <v-container>
                <v-row no-gutters>
                    <v-col cols="12" md="9">
                         <v-row no-gutters>
                              <v-col cols="2" md="1">
                                {{ todo.type }}
                            </v-col>
                            <v-col cols="10" md="11">
                                <span style="font-weight: bolder">{{ todo.content }}</span>
                            </v-col>
                        </v-row>
                    </v-col>
                    
                    <v-col cols="12" md="3">
                        <div style="display: flex; padding-right: 10px;">
                            <template v-if="todo.finish">
                            <v-btn dark color="blue" style="flex: 1;" @click="clickUnFinish(todo.id)">안끝났어!</v-btn>
                            </template>
                            <template v-else>
                                <v-btn dark color="blue" style="flex: 1;" @click="clickFinish(todo.id)">끝났어!</v-btn>
                            </template>
                            <v-btn dark color="red" style="flex: 1;" @click="clickRemove(todo.id)">X</v-btn>
                        </div>
                    </v-col>
                </v-row>                    
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },

    computed: {
        cardFinishColor() {
            let color = '#03A9F4'; //일반
            if(this.todo.type ==='회사'){
                color = '#FFA726';
            }
            else if(this.todo.type ==='가족'){
                color = '#66BB6A';
            }
            else if(this.todo.type ==='친구'){
                color = '#5C6BC0';
            }
            return color;
        },
        cardColor() {
            let color = '#E1F5FE'; //일반
            if(this.todo.type ==='회사'){
                color = '#FFF3E0';
            }
            else if(this.todo.type ==='가족'){
                color = '#E8F5E9';
            }
            else if(this.todo.type ==='친구'){
                color = '#E8EAF6';
            }
            return color;
        }
    },
    methods: {
        async clickRemove(id) {
            try {
                await this.$store.dispatch('todolists/removeTodoList', {
                    id: id,
                })
            } catch (error) {
                console.error(error);
            }
        },
        async clickFinish(id) {
            try {
                await this.$store.dispatch('todolists/finishTodoList', {
                    id: id,
                })
            } catch (error) {
                console.error(error);
            }
        },
        async clickUnFinish(id) {
            try {
                await this.$store.dispatch('todolists/unFinishTodoList', {
                    id: id,
                })
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>

<style>

</style>