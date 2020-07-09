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
                    v => /^[a-z]+[a-z0-9]{5,19}$/i.test(v) || '6글자 이상으로 만들어주세요.'
                ],
                passwordRules: [
                    v => !!v || '비밀번호를 입력해주세요.',
                    v => /(?=.*\d{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/i.test(v) || '8글자 이상, 영문 + 숫자'

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

            }
        }
    }
</script>

<style scoped>

</style>