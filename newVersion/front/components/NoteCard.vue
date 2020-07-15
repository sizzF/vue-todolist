<template>
    <v-container>
        <v-card>
            <v-container>
                <v-row no-gutters>
                    <v-col cols="9">
                        <span style="font-weight: bolder">{{ note.date.substr(0,10) }}</span>
                    </v-col>
                    <v-col cols="1">
                        <div style="text-align: center; vertical-align: bottom;">
                            <v-icon :style="{'color': weatherColor}">{{weatherIcon}}</v-icon>
                        </div>
                    </v-col>
                    <v-col cols="2">
                            <v-menu offset-y open-on-hover>
                                <template v-slot:activator="{ on }">
                                    <v-btn text color="blue" v-on="on">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <div style="background: white">
                                    <v-btn text color="blue" @click="clickModify">수정</v-btn>
                                    <v-btn text color="red" @click="clickRemove(note.id)">삭제</v-btn>
                                </div>
                            </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <blockquote class="blockquote" style="font-size: 15px;">
                            <span style="white-space: pre-line">{{ note.content }}</span>
                        </blockquote>
                    </v-col>
                </v-row>                    
            </v-container>
        </v-card>
        <v-dialog
                v-model="dialog"
                persistent
                max-width="700"
        >
            <v-card>
                <v-card-title class="headline">일기 수정</v-card-title>
                <v-container>
                <v-radio-group v-model="weather" row :mandatory="false">
                    날씨 :
                    <v-radio label="맑음" color="orange" value="맑음"/>
                    <v-radio label="흐림" color="#0D47A1" value="흐림"/>
                    <v-radio label="비" color="#90A4AE" value="비"/>
                    <v-radio label="눈" color="#81D4FA" value="눈"/>
                </v-radio-group>
                    <v-textarea
                            v-model="content"
                            outlined
                            auto-grow
                            clearable
                            label="내용을 수정해주세요!"
                            :rules="[v => !!v || '내용이 없어요!']"
                            required
                    />
                </v-container>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="cancelModify"
                    >
                        취소
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="postModify(note.id)"
                    >
                        수정
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
export default {
    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dialog: false,
            content: this.note.content,
            weather: this.note.weather,
        }
    },
    computed: {
        weatherIcon() {
            let icon = 'mdi-weather-sunny'; //맑음
            if(this.weather ==='흐림'){
                icon = 'mdi-weather-cloudy';
            }
            else if(this.weather ==='비'){
                icon = 'mdi-weather-pouring';
            }
            else if(this.weather ==='눈'){
                icon = 'mdi-weather-snowy';
            }
            return icon;
        },
        weatherColor() {
            let color = 'orange'; //맑음
            if(this.weather ==='흐림'){
                color = '#0D47A1';
            }
            else if(this.weather ==='비'){
                color = '#90A4AE';
            }
            else if(this.weather ==='눈'){
                color = '#81D4FA';
            }
            return color;
        },
    },
    methods: {
        async clickRemove(id) {
            try {
                await this.$store.dispatch('dailyNotes/removeDailyNote', {
                    id: id,
                })
            } catch (error) {
                console.error(error);
            }
        },
        clickModify() {
            this.dialog = true;
        },
        cancelModify(){
            this.dialog = false;
            this.content = this.note.content;
            this.weather = this.note.weather;
        },
        async postModify(id) {
            try {
                await this.$store.dispatch('dailyNotes/modifyDailyNote', {
                    id: id,
                    weather: this.weather,
                    content: this.content,
                })
                this.dialog = false;
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>

<style>

</style>