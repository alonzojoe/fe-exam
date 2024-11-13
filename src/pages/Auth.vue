<template>
    <form @submit.prevent="login">
        <div>
            <label for="">Username</label>
            <input type="text" v-model="formData.username">
        </div>
        <div>
            <label for="">Password</label>
            <input type="text" v-model="formData.password">
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
        <pre>{{ formData }}</pre>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import api from '../api';
const formData = ref({
    username: '',
    password: '',
})

const router = useRouter()

const login = async () => {
    try {
        const response = await api.get('users');
        const users = response.data.documents;

        const user = users.find(user => user.fields.username.stringValue === formData.value.username);

        if (user && user.fields.password.stringValue === formData.value.password) {
            localStorage.setItem('fe-exam-auth-user', JSON.stringify(user.fields));
            console.log('Login successful:', user.fields);
            router.push({ name: 'app-layout' })
        } else {
            alert('Invalid Username / Password')
        }

    } catch (error) {
        throw new Error('Could not login', error)
    }
}

</script>

<style lang="scss" scoped></style>