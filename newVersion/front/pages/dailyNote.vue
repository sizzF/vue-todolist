<template>
    <v-row no-gutters>
        <v-col cols="12" md="4">
            <note-form></note-form>
        </v-col>
        <v-col cols="12" md="8">
            <v-container>
                <v-menu
                        ref="menu"
                        v-model="menu"
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
                                label="조회"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="date"
                            type="month"
                            no-title
                            scrollable
                    >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="chageDate(date)">확인</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-container>
                <v-row no-gutters>
                    <v-col cols="12" md="6" v-for="(note, i) in mainDailyNotes" :key="i">
                        <note-card :note="note"/>
                    </v-col>
                </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import NoteForm from "../components/NoteForm";
    import NoteCard from "../components/NoteCard";
    import moment from "moment-timezone";
    export default {
        name: "profile",
        layout: 'page',
        middleware: 'authenticated',
        components: {
            NoteForm,
            NoteCard
        },
        fetch({ store }) {
            return Promise.all([
                store.dispatch('dailyNotes/getDailyNotes', { date: moment().format('YYYY-MM') }),
            ]);
        },
        data() {
            return {
                date: moment().format('YYYY-MM'),
            }
        },
        computed: {
            me(){
                return this.$store.state.users.me;
            },
            mainDailyNotes(){
                return this.$store.state.dailyNotes.mainDailyNotes;
            }
        },
        methods: {
            async chageDate(date) {
                try {
                    this.$refs.menu.save(date);
                    await this.$store.dispatch('dailyNotes/getDailyNotes', {
                        date: date,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>

<style scoped>

</style>