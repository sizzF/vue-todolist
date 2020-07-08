<template>
    <v-container style="width: 50%;">
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
                    <v-btn color="blue" type="submit" :disabled="!valid">로그인</v-btn>
                </v-form>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "profile"
    }
</script>

<style scoped>

</style>