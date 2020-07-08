<template>
    <v-container>
        <v-card>
            <v-container>
                <v-subheader>회원가입</v-subheader>
                <v-form ref="form" v-model="valid" @submit.prevent="onSignUpForm">
                    <v-text-field
                        v-model="id"
                        label="아이디"
                        type="id"
                        :rules="idRules"
                        required
                        />
                    <v-text-field
                        v-model="password"
                        label="패스워드"
                        type="password"
                        :rules="passwordRules"
                        required
                        />
                    <v-text-field
                        v-model="passwordCheck"
                        label="비밀번호 확인"
                        type="password"
                        :rules="passwordCheckRules"
                        required
                        />
                    <v-text-field
                        v-model="nickname"
                        label="닉네임"
                        type="nickname"
                        :rules="nicknameRules"
                        required
                        />
                    <v-checkbox
                        v-model="terms"
                        :rules="termsRules"
                        required
                        label="정보제공에 동의합니다."
                        />
                    <v-btn type="submit" color="blue" :disabled="!valid">가입하기</v-btn>
                </v-form>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "signup",
        data() {
            return {
                valid: false,
                id: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false,
                idRules: [
                    v => !!v || '아이디를 입력해주세요.',
                    v => /^[a-z]+[a-z0-9]{5,19}$/i.test(v) || '6글자 이상으로 만들어주세요.'
                ],
                passwordRules: [
                    v => !!v || '비밀번호를 입력해주세요.',
                    v => /(?=.*\d{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/i.test(v) || '8글자 이상, 영문 + 숫자'

                ],
                passwordCheckRules: [
                    v => !!v || '비밀번호 확인을 해주세요.',
                    v => /(?=.*\d{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/i.test(v) || '8글자 이상, 영문 + 숫자',
                    v => v === this.password || '비밀번호가 일치하지 않습니다.'
                ],
                nicknameRules: [
                    v => !!v || '닉네임을 입력해주세요.'
                ],
                termsRules: [
                    v => !!v || '약관에 동의해 주세요.'
                ]
            }
        },
        methods: {
            async onSignUpForm() {
                try{
                    if(this.$refs.form.validate()){
                        const result = await this.$store.dispatch('users/signUp', {
                            id: this.id,
                            password: this.password,
                            nickname: this.nickname,
                        })
                        if(result){
                            this.$router.push('/login');
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