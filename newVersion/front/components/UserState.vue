<template>
    <v-container>
        <v-card>
            <v-container>
                <v-avatar color="blue" size="32">
                    <span style="color: white;">{{ me.nickname[0] }}</span>
                </v-avatar>
                {{ me.nickname }}
            </v-container>
            <v-container>
                <span>한줄 메모 </span> {{totalProgress[1]}}
                <v-progress-linear
                        :value="totalProgress[0]"
                />
            </v-container>
            <v-container>
                <span>일기 : {{0}}개</span>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "UserState",
        computed: {
            me(){
                return this.$store.state.users.me;
            },
            totalProgress(){
                let finishCount = 0;
                this.me.TodoLists.forEach(v => {
                    if(v.finish){
                        finishCount++;
                    }
                });
                return [finishCount/this.me.TodoLists.length*100, finishCount+'/'+this.me.TodoLists.length];
            },

        }
    }
</script>

<style scoped>

</style>