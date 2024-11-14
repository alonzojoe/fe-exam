<template>
    <section>
        <div class="header-container">
            <h2 class="heading">
                Companies
            </h2>
            <Button @click="showForm">Add New Company +</Button>
        </div>

        <h5 class="sub-heading  mt-2">
            Manage the List of Companies
        </h5>
        <div class="table-responsive">
        </div>

        <CompanyForm :id="selectedCompanyId" :company="selectedCompany" v-if="isShow" @close="closeForm" />
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="5">Loading data...</td>
                    </tr>
                    <tr v-if="!isLoading && companies.length === 0">
                        <td colspan="5">No Records found</td>
                    </tr>
                    <tr v-for="(company, index) in companies" :key="company.id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="company.logo" alt="Company Logo" class="table-image" /></td>
                        <td>{{ company.name }}</td>
                        <td>{{ company.status }}</td>
                        <td><Button @click="showForm(company)">Edit</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import CompanyForm from './CompanyForm.vue';
import Button from '../../components/UI/Button.vue';

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