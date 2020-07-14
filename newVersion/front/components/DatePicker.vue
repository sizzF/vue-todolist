<template>
    <v-menu
            ref="menu1"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                    v-model="date"
                    label="날짜"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
            />
        </template>
        <v-date-picker
                v-model="date"
                type="date"
                no-title
                scrollable
        >
            <v-spacer />
            <v-btn text color="primary" @click="$refs.menu1.save(date)">확인</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "DatePicker",
        props: {
            date: {
                type: String,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>