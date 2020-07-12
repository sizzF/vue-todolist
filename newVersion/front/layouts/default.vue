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
                <div v-if="me">안녕하세요. {{me.nickname}}님</div>
                <v-toolbar-items v-if="!me">
                    <v-btn text nuxt to="/login">
                        로그인
                    </v-btn>
                    <v-btn text nuxt to="/signup">
                        회원가입
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items v-else>
                    <v-btn text @click="logout">
                        로그아웃
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
      <v-row no-gutters v-if="isIndex">
          <v-col cols="12" md="3">
              <todo-form />
              <todo-state />
          </v-col>
          <v-col cols="12" md="9">
              <nuxt />
          </v-col>
      </v-row>
      <v-row no-gutters v-else>
          <v-col cols="12" md="12">
              <nuxt />
          </v-col>
      </v-row>
  </v-app>
</template>

<script>
import TodoForm from '~/components/TodoForm';
import TodoState from '~/components/TodoState';
export default {
    components: {
        TodoForm,
        TodoState
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
        isIndex() {
            return this.$route.path === '/';
        }
    },
    methods: {
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

<style>

</style>