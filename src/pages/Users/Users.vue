<template>
    <div>
        <h2>Users Page</h2>
        <button @click="showForm">Add New User +</button>
        <UsersForm :id="selectedUserID" :user="selectedUser" v-if="isShow" @close="closeForm" />
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="5">Loading data...</td>
                </tr>
                <tr v-if="!isLoading && users.length === 0">
                    <td colspan="5">No Records found</td>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.type }}</td>
                    <td>{{ user.status }}</td>
                    <td><button @click="showForm(user)">Edit</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import api from '../../api';
import UsersForm from './UsersForm.vue';

const isLoading = ref(false)
const users = ref([])

const fetchUsers = async () => {
    isLoading.value = true
    try {
        const response = await api.get("/users");
        users.value = await response.data.documents.map((doc) => {
            const fields = doc.fields;
            return {
                id: doc.name.split('/').pop(),
                firstname: fields.firstname.stringValue,
                lastname: fields.lastname.stringValue,
                type: fields.type.stringValue,
                status: fields.status.stringValue,
                username: fields.username.stringValue,
                password: fields.password.stringValue,
            };
        });
    } catch (error) {
        throw new Error(`Could not fetch users ${error.message}`)
    } finally {
        isLoading.value = false
    }
}

const isShow = ref(false);
const selectedUserID = ref(null);
const selectedUser = ref({})
const showForm = (user) => {
    selectedUserID.value = user.id;
    selectedUser.value = user
    isShow.value = true;
};

const closeForm = () => {
    isShow.value = false
    fetchUsers()
}


onMounted(async () => {
    await fetchUsers()
})


</script>

<style lang="css" scoped></style>