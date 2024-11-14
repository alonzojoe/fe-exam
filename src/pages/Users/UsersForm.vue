<template>
    <Modal title="User Form" @close-modal="closeForm">
        <pre>{{ formData }}</pre>
        <form @submit.prevent="handleSubmit">
            <FormInput v-model="formData.firstname" label="First Name" id="u-name" type="text" placeholder="" />
            <FormInput v-model="formData.lastname" label="Last Name" id="u-lname" type="text" placeholder="" />
            <FormSelect v-model="formData.type" label="User Type" id="u-type" :options="typeOptions" />
            <FormSelect v-model="formData.status" label="Status" id="u-status" :options="statusOptions" />
            <FormInput v-model="formData.username" label="Username" id="u-username" type="text" placeholder="" />
            <FormInput v-model="formData.password" label="Password" id="u-password" type="password" placeholder="" />
            <div class="btn-container">
                <Button type="submit" :disabled="isLoading">{{ props.id ? 'Update User' : 'Add User' }}</Button>
            </div>

        </form>

    </Modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import Modal from '../../components/UI/Modal.vue';
import FormInput from '../../components/UI/FormInput.vue';
import FormSelect from '../../components/UI/FormSelect.vue';
import Button from '../../components/UI/Button.vue';
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
    formData.value = {
        firstname: '',
        lastname: '',
        type: 'Writer',
        status: 'Active',
        username: '',
        password: '',
    }
    emit('close');
};

const typeOptions = ref([
    {
        id: 'Writer',
        text: 'Writer',
    },
    {
        id: 'Editor',
        text: 'Editor',
    },
])

const statusOptions = ref([
    {
        id: 'Active',
        text: 'Active',
    },
    {
        id: 'Inactive',
        text: 'Inactive',
    },
])


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
            if (typeof newUser === 'object' && props.id) {
                formData.value = { ...newUser };
            }
        }
    },
    { immediate: true }
);

</script>

<style lang="scss" scoped></style>