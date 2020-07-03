<template>
    <v-container>
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="addTodoList">
                <v-container>
                    <v-text-field
                        v-model="content"
                        label="할일을 기록해주세요"
                        :rules="[v => !!v || '할일이 아직 없어요!']"
                        required
                    />
                    <div>분류</div>
                    <v-divider />
                    <v-radio-group
                        v-model="type"
                        row
                        :mandatory="false"
                        >
                    <v-radio
                        label="일반"
                        color="primary"
                        value="일반"
                    />
                    <v-radio
                        label="회사"
                        color="orange"
                        value="회사"
                    />
                    <v-radio
                        label="가족"
                        color="green"
                        value="가족"
                    />
                    <v-radio
                        label="친구"
                        color="indigo"
                        value="친구"
                    />
                    </v-radio-group>
                    <v-menu
                        ref="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="startDate"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startDate"
                            label="시작일"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        />
                        </template>
                        <v-date-picker
                        v-model="startDate"
                        type="date"
                        no-title
                        scrollable
                        >
                        <v-spacer />
                        <v-btn text color="primary" @click="$refs.menu1.save(startDate)">확인</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="endDate"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="endDate"
                            label="종료일"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        />
                        </template>
                        <v-date-picker
                        v-model="endDate"
                        type="date"
                        no-title
                        scrollable
                        >
                        <v-spacer />
                        <v-btn text color="primary" @click="$refs.menu2.save(endDate)">확인</v-btn>
                        </v-date-picker>
                    </v-menu>
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
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            content: '',
            type: '일반',
            valid: '',
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
                content: this.content,
                type: this.type,
                startDate: this.startDate,
                endDate: this.endDate,
                finish: false,
                });
                this.content='';
            }
        }
    },
}
</script>

<style>

</style>