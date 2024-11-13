<template>
    <Modal title="User Form" @close-modal="closeForm">
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="firstname">First Name</label>
                <input type="text" id="firstname" v-model="formData.firstname" required />
            </div>
            <div>
                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" v-model="formData.lastname" required />
            </div>
            <div>
                <label for="type">User Type</label>
                <select id="type" v-model="formData.type" required>
                    <option value="Writer">Writer</option>
                    <option value="Editor">Editor</option>
                </select>
            </div>
            <div>
                <label for="status">Status</label>
                <select id="status" v-model="formData.status" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="formData.username" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="formData.password" required />
            </div>
            <button type="submit" :disabled="isLoading">{{ props.id ? 'Update User' : 'Add User' }}</button>
        </form>
        <pre>{{ user }}</pre>
    </Modal>
</template>

<script setup>
import Modal from '../../components/UI/Modal.vue';
import { ref, watch } from 'vue';
import api from '../../api';

const props = defineProps({ id: String, user: Object });
const emit = defineEmits(['close']);


const formData = ref({
    firstname: '',
    lastname: '',
    type: 'Writer',
    status: 'Active',
    username: '',
    password: '',
});


const isLoading = ref(false);

const closeForm = () => {
    emit('close');
};


const handleSubmit = async () => {
    isLoading.value = true;
    const userData = {
        fields: {
            firstname: { stringValue: formData.value.firstname },
            lastname: { stringValue: formData.value.lastname },
            type: { stringValue: formData.value.type },
            status: { stringValue: formData.value.status },
            username: { stringValue: formData.value.username },
            password: { stringValue: formData.value.password },
        },
    };

    try {
        if (props.id) {
            await api.patch(`/users/${props.id}`, userData);
            alert("User updated successfully");
        } else {
            await api.post("/users", userData);
            alert("User added successfully");
        }
        closeForm();
    } catch (error) {
        console.error("Could not submit user:", error.message);
    } finally {
        isLoading.value = false;
    }
}

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            if (typeof newUser === 'object') {
                formData.value = { ...newUser };
            }
        }
    },
    { immediate: true }
);

</script>

<style lang="scss" scoped></style>