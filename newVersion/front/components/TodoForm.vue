<template>
    <v-container>
        <v-card>
            <v-container>
            <v-btn dark color="blue" type="button" @click="clickHideBtn" v-if="hide">할일 추가</v-btn>
                <v-form ref="form" v-model="valid" @submit.prevent="addTodoList" v-else>
                    <v-text-field
                        v-model="content"
                        label="할일을 기록해주세요"
                        :rules="[v => !!v || '할일이 아직 없어요!']"
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
                        <v-btn dark color="blue" type="button" @click="clickHideBtn">숨기기</v-btn>
                    </div>
                </v-form>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            today: new Date(),
            startDate: this.$moment().format('YYYY-MM-DD'),
            content: '',
            type: '일반',
            valid: '',
            hide: true,
            alert: false,
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
                    this.content='';
                    this.alert = true;
                    setTimeout(()=>{
                        this.alert=false
                    },2000);
                }
            }catch(err){
                console.error(err);
            }

        },
        clickHideBtn() {
            this.hide = !this.hide;
        }
    },
}
</script>

<style>

</style>