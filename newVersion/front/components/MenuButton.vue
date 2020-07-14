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
                    @click="moveRoute(item.title)"
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
                    { title: '할일메모' },
                    { title: '일기장' },
                    { title: '프로필' },
                    { title: '로그아웃' },
                ]
            }
        },
        methods: {
            async moveRoute(item){
                console.log('in');
                switch (item) {
                    case '할일메모':
                        this.$router.push('/');
                        break;
                    case '일기장':
                        this.$router.push('/dailyNote');
                        break;
                    case '프로필':
                        this.$router.push('/profile');
                        break;
                    case '로그아웃':
                        try{
                            const result = await this.$store.dispatch('users/logout');
                            if(result){
                                this.$router.push('/login');
                            }
                        }catch(err){
                            console.error(err);
                        }
                        break;
                }
            }
        },
    }
</script>

<style scoped>

</style>