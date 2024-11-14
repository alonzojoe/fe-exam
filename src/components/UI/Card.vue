<template>
    <div class="card">
        <div class="card-header">
            <slot name="header" />
        </div>
        <div class="card-body">
            <slot name="body" />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem 3rem;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    font-weight: bold;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.card-body {
    padding: 1rem 0;
    font-size: 1rem;
    color: #333;
    margin-bottom: 1rem;
}
</style>