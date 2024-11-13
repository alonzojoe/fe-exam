<template>
    <div class="backdrop">
        <div class="modal-container">
            <span class="close-btn" @click="$emit('close-modal')">
                <span>&times;</span>
            </span>
            <div class="modal-body">
                <div class="modal-title">{{ title }}</div>
                <div class="modal-content">
                    <slot>
                        Modal content is empty!
                    </slot>
                </div>
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

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    width: 80vh;
    max-height: 100vh;
    overflow: hidden;
    background: #fff;
    border-radius: 7px;
    position: relative;
    animation: show 0.4s ease-in;
}

.close-btn {
    position: absolute;
    background: #FD6366;
    cursor: pointer;
    color: #fff;
    font-size: 2rem;
    z-index: 5;
    top: 5px;
    right: 10px;
    height: 30px;
    width: 30px;
    text-align: center;
    border-radius: 50%;
}

.close-btn:hover {
    transform: scale(1.15);
    transition: transform 0.4s ease-in;
}

.modal-body {
    position: relative;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0.5rem;
}

.modal-title {
    margin-top: 2rem;
    font-size: 2.3rem;
    font-weight: 600;
    text-align: center;
}

.modal-content {
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px 15px;
    margin-bottom: 2rem;
}

@media screen and (max-width: 768px) {
    .modal-container {
        width: 90vh;
    }
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
