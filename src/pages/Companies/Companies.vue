<template>
    <div>
        <h2>Companies</h2>
        <button @click="showForm">Add New Company +</button>
        <CompanyForm :id="selectedCompanyId" :company="selectedCompany" v-if="isShow" @close="closeForm" />
        <table>
            <thead>
                <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="4">Loading data...</td>
                </tr>
                <tr v-if="!isLoading && companies.length === 0">
                    <td colspan="4">No Records found</td>
                </tr>
                <tr v-for="company in companies" :key="company.id">
                    <td><img :src="company.logo" alt="Company Logo" width="50" height="50" /></td>
                    <td>{{ company.name }}</td>
                    <td>{{ company.status }}</td>
                    <td><button @click="showForm(company)">Edit</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import CompanyForm from './CompanyForm.vue';

import api from '../../api';
const isLoading = ref(false)
const companies = ref([])

const fetchCompanies = async () => {
    isLoading.value = true
    try {
        const response = await api.get("/companies");
        companies.value = await response.data.documents.map((doc) => {
            const fields = doc.fields;
            return {
                id: doc.name.split('/').pop(),
                logo: fields.logo.stringValue,
                name: fields.name.stringValue,
                status: fields.status.stringValue,
            };
        });
    } catch (error) {
        throw new Error(`Could not fetch companies ${error.message}`)
    } finally {
        isLoading.value = false
    }
}

const isShow = ref(false);
const selectedCompanyId = ref(null);
const selectedCompany = ref({})
const showForm = (company) => {
    selectedCompanyId.value = company?.id;
    selectedCompany.value = company
    isShow.value = true;
};

const closeForm = () => {
    isShow.value = false
    fetchCompanies()
}


onMounted(async () => {
    await fetchCompanies()
})

</script>

<style lang="scss" scoped></style>