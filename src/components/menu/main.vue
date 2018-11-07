<template>
<div>

    <p>Coming soon</p>
    <button type="button" v-on:click="onexport()">Excel download</button>

</div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    data() {
        return {
            dialog: false,
            animals: [{
                "name": "cat",
                "category": "animal"
            }, {
                "name": "dog",
                "category": "animal"
            }, {
                "name": "pig",
                "category": "animal"
            }]
        }
    },
    methods: {
        onexport() {
            var animalWS = XLSX.utils.json_to_sheet(this.animals);
            var wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, animalWS, 'animals')
            XLSX.writeFile(wb, 'book.xlsx')
        }
    }
}
</script>

<style scoped>

</style>
