<template>
    <Modal title="Company Form" @close-modal="closeForm">
        <form @submit.prevent="handleSubmit">
            <FormInput v-model="formData.name" label="Name" id="c-name" type="text" placeholder="" />
            <FormInput v-model="formData.logo" label="Logo URL" id="c-logo" type="link" placeholder="" />
            <FormSelect v-model="formData.status" label="Status" id="c-status" :options="statusOptions" />
            <div class="btn-container">
                <Button type="submit" :disabled="isLoading">{{ id ? 'Update Company' : 'Add Company' }}</Button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import Modal from '../../components/UI/Modal.vue';
import Button from '../../components/UI/Button.vue';
import FormInput from '../../components/UI/FormInput.vue';
import FormSelect from '../../components/UI/FormSelect.vue';
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
    formData.value = {
        name: '',
        logo: '',
        status: 'Active',
    }
    emit('close');
};

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
        if (typeof newCompany === 'object' && props.id) {
            formData.value = { ...newCompany };
        }
    },
    { immediate: true }
);


</script>

<style lang="scss" scoped></style>