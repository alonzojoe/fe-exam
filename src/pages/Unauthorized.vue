<template>
    <div class="fluid">
        <h2>401 You are not authorized to access this page.</h2>
        <button @click="$router.go(-1)">Go Back</button>
    </div>
</template>

<script setup>

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
    font-size: 4rem;
    color: var(--text-lighter);
}
</style>