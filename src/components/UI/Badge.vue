<template>
    <div :class="badgeClass" class="badge">
        <slot />
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: 'For Edit'
    },
});

const badgeClass = computed(() => {
    return {
        'badge-edit': props.type === 'For Edit',
        'badge-published': props.type === 'Published',
    };
});

</script>

<style scoped>
.badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 500;
    color: white;
}

.badge-edit {
    background-color: #748493;
}

.badge-published {
    background-color: #0AB702;
}
</style>