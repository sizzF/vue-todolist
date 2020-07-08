<template>
    <v-container>
        <v-card>
            <v-subheader>진행상황</v-subheader>
            <v-container>
                <div style="margin-bottom: 10px;">
                    <span>전체 {{totalProgress[1]}}</span>
                    <v-progress-linear
                            :value="totalProgress[0]"
                    />
                </div>
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
            }
        },
        computed: {
            mainTodoLists() {
                return this.$store.state.todolists.mainTodoLists;
            },
            totalProgress(){
                let finishCount = 0;
                this.mainTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/this.mainTodoLists.length*100, finishCount+'/'+this.mainTodoLists.length];
            },
            normalProgress(){
                let tempTodoLists = this.mainTodoLists.filter( v => {
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
                let tempTodoLists = this.mainTodoLists.filter( v => {
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
                let tempTodoLists = this.mainTodoLists.filter( v => {
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
                let tempTodoLists = this.mainTodoLists.filter( v => {
                    return v.type === '친구';
                });
                let finishCount = 0;
                tempTodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/tempTodoLists.length*100, finishCount+'/'+tempTodoLists.length];
            }
        }
    }
</script>

<style scoped>

</style>