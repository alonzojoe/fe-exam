<template>
    <div>
        <h2>Companies</h2>
        <button>Add New Company +</button>
        <table>
            <thead>
                <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
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
                    <td><button>Edit</button></td>
                    <td><button>Delete</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import api from '../../api';
const isLoading = ref(false)
const companies = ref([])

const fetchCompanies = async () => {
    isLoading.value = true
    try {
        const response = await api.get(
            "https://firestore.googleapis.com/v1/projects/article-db-6e0cd/databases/(default)/documents/companies"
        );
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

onMounted(async () => {
    await fetchCompanies()
})

</script>

<style lang="scss" scoped></style>