<template>
    <div>
        <h1>App Layout

        </h1>
        <pre>{{ authenticantedUser }}</pre>
        <button @click="logout">Logout</button>
        <router-view />
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const authenticantedUser = computed(() => store.getters.getAuthUser)



const logout = () => {
    localStorage.removeItem('fe-exam-auth-user')
    router.push({ name: 'login' })
}

const storeAuthDetails = () => {
    const storedAuth = JSON.parse(localStorage.getItem('fe-exam-auth-user'));
    if (storedAuth) {
        const userAuth = {
            id: storedAuth.id,
            firstname: storedAuth.firstname,
            lastname: storedAuth.lastname,
            username: storedAuth.username,
            type: storedAuth.type,
            status: storedAuth.status
        };

        store.commit('setAuthUser', userAuth);
    }
}

onMounted(() => {
    storeAuthDetails()
})


</script>

<style lang="scss" scoped></style>