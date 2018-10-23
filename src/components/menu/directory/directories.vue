<template>
<div>
    <directoryList></directoryList>
    <div v-if="id === 'organization'">
        <Organization></Organization>
    </div>
    <div v-if="id === 'employee'">
        <Employee></Employee>
    </div>

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
