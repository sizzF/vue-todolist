<template>
    <v-container>
        <v-card>
            <v-subheader>
                진행상황
                <v-spacer></v-spacer>
                <v-btn text color="blue" type="button" @click="clickHideBtn" v-if="hide">자세히</v-btn>
                <v-btn text color="blue" type="button" @click="clickHideBtn" v-else>간단히</v-btn>
            </v-subheader>
            <v-container>
                <div style="margin-bottom: 10px;">
                    <span>전체 {{totalProgress[1]}}</span>
                    <v-progress-linear
                            :value="totalProgress[0]"
                    />
                </div>
                <template v-if="!hide">
                    <div style="display: flex;">
                        <div style="margin-bottom: 10px; flex: 1; text-align: center;">
                            <div>일반</div>
                            <v-progress-circular
                                    :value="normalProgress[0]"
                                    color="blue"
                            />
                            <div>{{normalProgress[1]}}</div>
                        </div>
                        <div style="margin-bottom: 10px; flex: 1; text-align: center;">
                            <div>회사</div>
                            <v-progress-circular
                                    :value="companyProgress[0]"
                                    color="orange"
                            />
                            <div>{{companyProgress[1]}}</div>
                        </div>
                        <div style="margin-bottom: 10px; flex: 1; text-align: center;">
                            <div>가족</div>
                            <v-progress-circular
                                    :value="familyProgress[0]"
                                    color="green"
                            />
                            <div>{{familyProgress[1]}}</div>

                        </div>
                        <div style="margin-bottom: 10px; flex: 1; text-align: center;">
                            <div>친구</div>
                            <v-progress-circular
                                    :value="friendProgress[0]"
                                    color="indigo"
                            />
                            <div>{{friendProgress[1]}}</div>
                        </div>
                    </div>
                </template>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "TodoState",
        data() {
            return {
                test: 10,
                hide: true,
            }
        },
        computed: {
            mainTodoLists() {
                return this.$store.state.todolists.mainTodoLists;
            },
            findDate() {
                return this.$store.state.todolists.findDate;
            },
            viewTodoLists(){
                let tempList = [];
                this.mainTodoLists.forEach(v => {
                    const startDate = v.startDate.substr(0,4)*10000+v.startDate.substr(5,2)*100+v.startDate.substr(8,2);
                    const date = this.findDate.substr(0,4)*10000+this.findDate.substr(5,2)*100+this.findDate.substr(8,2);
                    if(startDate===date){
                        tempList.push(v);
                    }
                });
                return tempList;
            },
            totalProgress(){
                let finishCount = 0;
                this.viewTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/this.viewTodoLists.length*100, finishCount+'/'+this.viewTodoLists.length];
            },
            normalProgress(){
                let tempTodoLists = this.viewTodoLists.filter( v => {
                    return v.type === '일반';
                });
                let finishCount = 0;
                tempTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/tempTodoLists.length*100, finishCount+'/'+tempTodoLists.length];
            },
            companyProgress(){
                let tempTodoLists = this.viewTodoLists.filter( v => {
                    return v.type === '회사';
                });
                let finishCount = 0;
                tempTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/tempTodoLists.length*100, finishCount+'/'+tempTodoLists.length];
            },
            familyProgress(){
                let tempTodoLists = this.viewTodoLists.filter( v => {
                    return v.type === '가족';
                });
                let finishCount = 0;
                tempTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/tempTodoLists.length*100, finishCount+'/'+tempTodoLists.length];
            },
            friendProgress(){
                let tempTodoLists = this.viewTodoLists.filter( v => {
                    return v.type === '친구';
                });
                let finishCount = 0;
                tempTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/tempTodoLists.length*100, finishCount+'/'+tempTodoLists.length];
            },
        },
        methods: {
            clickHideBtn() {
                this.hide = !this.hide;
            }
        }
    }
</script>

<style scoped>

</style>