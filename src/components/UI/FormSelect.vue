<template>
    <div class="form-input">
        <label :for="id">{{ label }}</label>
        <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" required>
            <option value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.id" :value="option.id" :disabled="option.hidden">
                {{ option.text }}

            </option>
        </select>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
    placeholder: {
        type: String,
        default: "Please select",
    },
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
});
</script>

<style lang="css" scoped>
.form-input {
    margin: 0.5rem;
    margin-bottom: 1.5rem;
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

select {
    padding: 0.9rem 0.7rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
    outline: none;
    font-size: 1.4rem;
    font-weight: 500;
}

select:focus {
    border-color: #464b50;
}
</style>