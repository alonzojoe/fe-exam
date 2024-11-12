<template>
    <div>
        <h1>App Layout</h1>
        <button @click="logout">Logout</button>
        <router-view />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const logout = () => {
    localStorage.clear()
    router.push({ name: 'login' })
}

</script>

<style lang="scss" scoped></style>