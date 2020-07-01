<template>
    <v-container>
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="addTodoList">
                <v-container>
                    <v-text-field
                        v-model="content"
                        label="할일을 기록해주세요"
                    />
                    <v-btn dark color="blue" type="submit">추가</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            content: '',
        }
    },
    computed: {
        todoLists() {
            return this.$store.state.todolists.mainTodoLists;
        }
    },
    methods: {
        addTodoList() {
            if(this.$refs.form.validate()){
                this.$store.commit('todolists/addTodoList', {
                content: this.content
                });
                this.content='';
            }
        }
    },
}
</script>

<style>

</style>