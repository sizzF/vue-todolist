<template>
    <v-row no-gutters>
        <v-col cols="12" md="4">
            <v-container>
                <v-card>
                    일기
                </v-card>
            </v-container>
        </v-col>
        <v-col cols="12" md="8">
            <v-container>
                <v-card>
                    일기
                </v-card>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "profile",
        layout: 'page',
        middleware: 'authenticated',
        computed: {
            me(){
                return this.$store.state.users.me;
            }
        }
    }
</script>

<style scoped>

</style>