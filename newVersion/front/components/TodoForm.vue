<template>
    <v-container>
        <v-card>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>할일 기록</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form ref="form" v-model="valid" @submit.prevent="addTodoList">
                            <v-text-field
                                    v-model="content"
                                    label="할일을 기록해주세요"
                                    :success-message="successMessages"
                                    :success="success"
                                    required
                            />
                            <v-alert type="success" :value="alert">입력성공</v-alert>
                            <div>분류</div>
                            <v-divider />
                            <v-radio-group v-model="type" row :mandatory="false">
                                <v-radio label="일반" color="primary" value="일반"/>
                                <v-radio label="회사" color="orange" value="회사"/>
                                <v-radio label="가족" color="green" value="가족"/>
                                <v-radio label="친구" color="indigo" value="친구"/>
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
                                            label="날짜"
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
                            <div>
                                <v-btn dark color="blue" type="submit">추가</v-btn>
                            </div>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-container>
</template>

<script>
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Seoul');
export default {
    data() {
        return {
            today: new Date(),
            startDate: moment().format('YYYY-MM-DD'),
            content: '',
            type: '일반',
            valid: '',
            alert: false,
            successMessages:  '',
            success: false,
        }
    },
    methods: {
        async addTodoList() {
            try{
                if(this.$refs.form.validate()){
                    await this.$store.dispatch('todolists/addTodoList',{
                        content: this.content,
                        type: this.type,
                        startDate: this.startDate,
                        finish: false,
                    });
                    this.success = true;
                    this.successMessages = '할일 등록 성공';
                    this.content='';
                    // this.alert = true;
                    // setTimeout(()=>{
                    //     this.alert=false
                    // },2000);
                }
            }catch(err){
                console.error(err);
            }

        },
    },
}
</script>

<style>

</style>