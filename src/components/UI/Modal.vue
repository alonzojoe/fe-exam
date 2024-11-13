<template>
    <div class="backdrop">
        <div class="modal-container">
            <span @click="$emit('close-modal')">
                <i>&times;</i>
            </span>
        </div>
        <div class="modal-body">
            <div>{{ title }}</div>
            <div class="modal-content">
                <slot>
                    Modal content is empty!
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: String
})

const emit = defineEmits(['close-modal'])

</script>

<style lang="css" scoped></style>
