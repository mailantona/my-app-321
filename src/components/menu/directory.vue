<template>
<div>
    <div>
        <v-btn-toggle>
            <v-btn to="/directory/employee">Сотрудники</v-btn>
            <v-btn to="/directory/organization">Организации</v-btn>
        </v-btn-toggle>
        <br><br>
    </div>
        <Organization v-if="id === 'organization'"></Organization>
        <Employee v-if="id === 'employee'"></Employee>

    </div>
</template>

<script>
import Employee from './directory/employee.vue';
import Organization from './directory/organization.vue';

export default {
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    components: {
        Employee,
        Organization
    }
}
</script>
