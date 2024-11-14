<template>
    <div class="fluid">
        <h2>404</h2>
        <h3>The page you were looking for doesn't exist.</h3>
        <Button mode="cancel" @click="$router.push('/home')">Go Back</Button>
    </div>
</template>

<script setup>
import Button from '../components/UI/Button.vue';
</script>

<style scoped>
.fluid {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h2 {
    font-size: 5rem;
    color: var(--text-lighter);
}

h3 {
    font-size: 3rem;
    color: var(--text-lighter);
    margin-bottom: 2rem;
}
</style>