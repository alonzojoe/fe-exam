<template>
    <div class="form-input">
        <label :for="id">{{ label }}</label>
        <input :id="id" :placeholder="placeholder" :type="inputType" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" required />
    </div>
    <div v-if="type === 'password'" class="show-password-toggle">
        <div>
            <input type="checkbox" id="show-password" v-model="showPassword" />
        </div>
        <span class="show-password-span">Show Password</span>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    placeholder: String,
    type: String
});


const showPassword = ref(false);


const inputType = computed(() => (props.type === 'password' && showPassword.value) ? 'text' : props.type);
</script>

<style scoped>
.form-input {
    margin: 0.5rem 0 1.5rem 0;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
    font-size: 1.7rem;
    color: var(--text-lighter);
    margin-bottom: 0.7rem;
}

input:not(.checkbox-input) {
    padding: 0.9rem 0.7rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
    outline: none;
    font-size: 1.4rem;
    font-weight: 500;
}

input:focus:not(.checkbox-input) {
    border-color: #464b50;
}

.show-password-toggle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 0.5rem;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.show-password-span {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
</style>