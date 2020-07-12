<template>
    <v-row no-gutters>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="6">
            <v-container>
                <v-card>
                    <v-container>
                        <v-subheader>로그인</v-subheader>
                        <v-form ref="form" v-model="valid" @submit.prevent="onLoginForm">
                            <v-text-field
                                    v-model="id"
                                    type="id"
                                    label="아이디"
                                    :rules="idRules"
                                    required
                            />
                            <v-text-field
                                    v-model="password"
                                    type="password"
                                    label="비밀번호"
                                    :rules="passwordRules"
                                    required
                            />
                            <v-btn dark color="blue" type="submit">로그인</v-btn>
                        </v-form>
                    </v-container>
                    <v-container>
                        <v-btn dark color="blue" type="button" @click="loadUser">혹시 이미 로그인중이라고 나오나요?</v-btn>
                    </v-container>
                </v-card>
            </v-container>
        </v-col>
        <v-col cols="12" md="3"></v-col>
    </v-row>

</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                valid: false,
                id: '',
                password: '',
                idRules: [
                    v => !!v || '아이디를 입력해주세요.',
                ],
                passwordRules: [
                    v => !!v || '비밀번호를 입력해주세요.',
                ],
            }
        },
        methods: {
            async onLoginForm() {
                try{
                    if(this.$refs.form.validate()){
                        const result = await this.$store.dispatch('users/login', {
                            id: this.id,
                            password: this.password,
                        })
                        if(result){
                            this.$router.push('/');
                        }
                    }
                }catch(err){
                    console.error(err);
                }

            },
            async loadUser() {
                try{
                    const result = await this.$store.dispatch('users/loadUser');
                    if (result){
                        this.$router.push('/');
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