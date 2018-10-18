<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-dialog>
            <v-btn slot="activator" color="blue" dark class="mb-2">Добавить</v-btn>
        </v-dialog>
    </v-toolbar>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs4>
                <span class="display-1">Новые</span>
            </v-flex>
            <v-flex xs4>
                <span class="display-1">В работе</span>
            </v-flex>
            <v-flex xs4>
                <span class="display-1">Готово</span>
            </v-flex>
            <!-- Задачи -->
            <v-flex xs4>
                <v-hover>

                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                        <v-card-title class="cyan">
                            <span class="subheading white--text">Постоение карт различных параметров</span>
                        </v-card-title>
                        <v-list three-line>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title>(650) 555-1234 ваываыва ываыва ыва ыва ыва ыв аыв ук впва пввыа аыв аыва ыв аыв аыва выа ыв аыва ыв авыа ыв аыва ап вап вап ва пва пвап ва пва па</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-avatar>
                                    <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                                </v-list-tile-avatar>
                                    <!-- <v-list-tile-action>
                                    <v-icon color="grey">
                                        table_chart
                                    </v-icon>
                                </v-list-tile-action> -->

                            </v-list-tile>
                        </v-list>
                        <!--  <v-divider></v-divider> -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon color="cyan" flat>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="cyan" flat>Детали</v-btn>

                        </v-card-actions>
                    </v-card>
                </v-hover>

                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>

            </v-flex>
            <v-flex xs4>
                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    data: () => ({
        reviews: 413,
        value: 4.5
    })
}
</script>

<style>
.borderRight {
    border-right: 1px solid gray !important;
}
</style>
