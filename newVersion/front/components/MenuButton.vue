<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="items.method"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                items: [
                    { title: '일기장', method: this.moveDailyNote },
                    { title: '프로필', method: this.moveProfile },
                    { title: '로그아웃', method: this.logout },
                ]
            }
        },
        methods: {
            moveDailyNote(){
                this.$router.push('/dailyNote');
            },
            moveProfile(){
                this.$router.push('/profile');
            },
            async logout() {
                try{
                    const result = await this.$store.dispatch('users/logout');
                    if(result){
                        this.$router.push('/login');
                    }
                }catch(err){
                    console.error(err);
                }
            }
        }
    }
</script>

<style scoped>

</style>