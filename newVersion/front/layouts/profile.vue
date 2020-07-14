<template>
    <v-app>
        <nav>
            <v-toolbar dark color="blue">
                <v-toolbar-title>
                    <nuxt-link to="/" :style="{ color:'white', textDecoration:'none' }">
                        TodoList
                    </nuxt-link>
                </v-toolbar-title>
                <v-spacer />
                <div v-if="me">{{me.nickname}}님</div>
                <v-toolbar-items v-if="!me">
                    <v-btn text nuxt to="/login">
                        로그인
                    </v-btn>
                    <v-btn text nuxt to="/signup">
                        회원가입
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items v-else>
                    <menu-button />
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <nuxt />
    </v-app>
</template>

<script>
    import MenuButton from '~/components/MenuButton';
    export default {
        components: {
            MenuButton
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            },
        },
        methods: {

        }

    }
</script>

<style>

</style>