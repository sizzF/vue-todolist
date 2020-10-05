<template>
    <v-container>
        <v-card>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>일기 쓰기</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-menu
                                ref="menu1"
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
                                        label="날짜"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                />
                            </template>
                            <v-date-picker
                                    v-model="date"
                                    type="date"
                                    no-title
                                    scrollable
                            >
                                <v-spacer />
                                <v-btn text color="primary" @click="$refs.menu1.save(date)">확인</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <div>날씨</div>
                        <v-radio-group v-model="weather" row :mandatory="false">
                            <v-radio label="맑음" color="orange" value="맑음"/>
                            <v-radio label="흐림" color="#0D47A1" value="흐림"/>
                            <v-radio label="비" color="#90A4AE" value="비"/>
                            <v-radio label="눈" color="#81D4FA" value="눈"/>
                        </v-radio-group>
                        <v-form ref="form" v-model="valid" @submit.prevent="addDailyNote">
                            <v-textarea
                                    v-model="content"
                                    outlined
                                    auto-grow
                                    clearable
                                    label="오늘 하루를 기록해보세요!"
                                    :success-message="successMessages"
                                    :success="success"                                    
                                    required
                            />
                            <v-alert type="success" :value="alert">입력성공</v-alert>
                            <v-btn dark color="blue" type="submit">추가</v-btn>
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
            //startDate: this.$moment().format('YYYY-MM-DD'),
            date: moment().format('YYYY-MM-DD'),
            content: '',
            weather: '맑음',
            valid: '',
            alert: false,
            successMessages:  '',
            success: false,
        }
    },
    methods: {
        async addDailyNote() {
            try{
                if(this.$refs.form.validate()){
                    await this.$store.dispatch('dailyNotes/addDailyNote',{
                        content: this.content,
                        weather: this.weather,
                        date: this.date,
                    });
                    this.success = true;
                    this.successMessages = '일기 등록 성공';
                    this.content='';
                    setTimeout(()=>{
                        this.success=false;
                    },2000);
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