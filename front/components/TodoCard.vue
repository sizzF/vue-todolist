<template>
    <v-container>
        <v-card>
            <v-container>
                {{ todo.content }}
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        todo: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style>

</style>