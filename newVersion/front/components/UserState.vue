<template>
    <v-container>
        <v-card>
            <v-container>
                <v-avatar color="blue" size="32">
                    <span style="color: white;">{{ me.nickname[0] }}</span>
                </v-avatar>
                {{ me.nickname }}
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "UserState",
        computed: {
            me(){
                return this.$store.state.users.me;
            }
        }
    }
</script>

<style scoped>

</style>