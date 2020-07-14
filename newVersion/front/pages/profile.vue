<template>
    <v-row no-gutters>
        <v-col cols="12" md="4">
            <user-state />
        </v-col>
        <v-col cols="12" md="4">
            <v-container>
                <v-card>
                    <v-subheader>프로필 수정</v-subheader>
                    <v-container>
                        <v-form ref="form" v-model="vaild" @submit.prevent="onProfileModify">
                            <v-text-field
                                v-model="nickname"
                                label="닉네임"
                                type="nickname"
                                :rules="nicknameRules"
                                required
                                />
                        </v-form>
                        <v-btn :disabled="!vaild" color="blue" type="submit">수정</v-btn>
                    </v-container>
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    import UserState from "../components/UserState";
    export default {
        name: "profile",
        middleware: 'authenticated',
        components: {UserState},
        layout: 'profile',
        data() {
            return {
                nickname: '',
                vaild: false,
                nicknameRules: [v => !!v || '닉네임을 입력해주세요.']
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            }
        },
        methods: {
            async onProfileModify() {
                try{
                    if(this.$refs.form.validate()){
                        const result = await this.$store.dispatch('users/modifyProfile', {
                            nickname: this.nickname,
                        })
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