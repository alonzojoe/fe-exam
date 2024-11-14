<template>
    <button :class="btnClass" :type="type" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: String,
    mode: {
        type: String,
        default: 'normal',
        validator: (value) => ['normal', 'success', 'danger'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const btnClass = computed(() => [
    'btn',
    {
        'normal': props.mode === 'normal',
        'publish': props.mode === 'publish',
        'cancel': props.mode === 'cancel',
        'disabled': props.disabled
    }
]);

</script>

<style scoped>
.btn {
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}


.normal {
    background-color: #000;
    color: white;
}

.publish {
    background-color: #0AB702;
    color: #FFFFFF;
}

.cancel {
    background-color: #FA2A2A;
    color: white;
}


.disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

.btn:hover:not(.btn-disabled) {
    opacity: 0.85;
}
</style>