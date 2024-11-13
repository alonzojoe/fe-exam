<template>
    <Modal title="Company Form" @close-modal="closeForm">
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Company Name</label>
                <input type="text" id="name" v-model="formData.name" required />
            </div>
            <div>
                <label for="logo">Logo URL</label>
                <input type="text" id="logo" v-model="formData.logo" required />
            </div>
            <div>
                <label for="status">Status</label>
                <select id="status" v-model="formData.status" required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" :disabled="isLoading">{{ id ? 'Update Company' : 'Add Company' }}</button>
        </form>
        <pre>{{ company }}</pre>
    </Modal>
</template>

<script setup>
import Modal from '../../components/UI/Modal.vue';
import { ref, watch } from 'vue';
import api from '../../api';

const props = defineProps({ id: String, company: Object });
const emit = defineEmits(['close']);


const formData = ref({
    name: '',
    logo: '',
    status: 'Active',
});

const isLoading = ref(false);

const closeForm = () => {
    emit('close');
};


const handleSubmit = async () => {
    isLoading.value = true
    const companyData = {
        fields: {
            name: { stringValue: formData.value.name },
            logo: { stringValue: formData.value.logo },
            status: { stringValue: formData.value.status },
        },
    };
    try {
        if (props.id) {
            await api.patch(`/companies/${props.id}`, companyData);
            alert("Company updated successfully");
        } else {
            await api.post("/companies", companyData);
            alert("Company added successfully");
        }
        closeForm();
    } catch (error) {
        console.error("Could not submit company:", error.message);
    } finally {
        isLoading.value = false;
    }
};

watch(
    () => props.company,
    (newCompany) => {
        if (newCompany) {
            formData.value = { ...newCompany };
        }
    },
    { immediate: true }
);


</script>

<style lang="scss" scoped></style>