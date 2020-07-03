<template>
  <v-app>
      <nav>
            <v-toolbar dark color="blue">
                <v-toolbar-title>
                    <nuxt-link to="/" :style="{ color:'white', textDecoration:'none' }">
                    TodoList
                    </nuxt-link>
                </v-toolbar-title>
            </v-toolbar>
        </nav>
      <v-row no-gutters>
          <v-col cols="12" md="3">
              <todo-form />
          </v-col>
          <v-col cols="12" md="9">
              <nuxt />
          </v-col>
      </v-row>
  </v-app>
</template>

<script>
import TodoForm from '~/components/TodoForm';
export default {
    components: {
        TodoForm
    }
}
</script>

<style>

</style>