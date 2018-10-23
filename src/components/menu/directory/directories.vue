<template>
<div>
    <directoryList></directoryList>

    <Organization v-if="id === 'organization'"></Organization>

    <Employee v-if="id === 'employee'"></Employee>

</div>
</template>

<script>
import Employee from './employee.vue';
import Organization from './organization.vue';
import directoryList from './directoryList.vue';

export default {
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    components: {
        Employee,
        Organization,
        directoryList
    }
}
</script>

<style>

</style>
