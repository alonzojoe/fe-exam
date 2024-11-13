<template>
    <div>
        <Navbar :authUser="authenticantedUser" @log-out="logout" />
        <main class="container">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';

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

<style scoped>
.container {
    padding: 100px 9%;
    margin-top: 0;
}

@media screen and (max-width: 991px) {
    .container {
        padding: 100px 2rem;
    }
}

@media screen and (max-width: 1279px) {
    .container {
        padding: 100px 4%;
    }
}

@media screen and (max-width: 1200px) {
    .container {
        padding: 100px 2%;
    }
}
</style>