<template>
    <div class="form-input">
        <label :for="id">{{ label }}</label>
        <input :id="id" :placeholder="placeholder" type="text" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" required />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    placeholder: String
})
</script>

<style scoped>
.form-input {
    margin: 0.5rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
    font-size: 1.7rem;
    color: var(--text-lighter);
    margin-bottom: 0.7rem;
}

input {
    padding: 0.9rem 0.7rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
    outline: none;
    font-size: 1.4rem;
    font-weight: 500;
}

input:focus {
    border-color: #464b50;
}
</style>