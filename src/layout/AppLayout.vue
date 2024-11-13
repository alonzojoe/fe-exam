<template>
    <div>
        <h1>App Layout
            <pre>{{ authenticantedUser }}</pre>
        </h1>
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


onMounted(() => {
    const storedAuth = JSON.parse(localStorage.getItem('fe-exam-auth-user'))
    if (storedAuth) {

        const userAuth = {
            // password: storedAuth.password.stringValue,
            firstname: storedAuth.firstname.stringValue,
            type: storedAuth.type.stringValue,
            status: storedAuth.status.stringValue,
            lastname: storedAuth.lastname.stringValue,
            username: storedAuth.username.stringValue,
        };

        store.commit('setAuthUser', userAuth)
    }
})


</script>

<style lang="scss" scoped></style>