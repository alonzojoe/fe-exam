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

            const userId = user.name.split('/').pop();

            const authUser = {
                id: userId,
                firstname: user.fields.firstname.stringValue,
                lastname: user.fields.lastname.stringValue,
                username: user.fields.username.stringValue,
                password: user.fields.password.stringValue,
                type: user.fields.type.stringValue,
                status: user.fields.status.stringValue
            };

            localStorage.setItem('fe-exam-auth-user', JSON.stringify(authUser));
            console.log('Login successful:', authUser);
            router.push({ name: 'media' });
        } else {
            alert('Invalid Username / Password');
        }

    } catch (error) {
        throw new Error('Could not login', error)
    }
}

</script>

<style lang="scss" scoped></style>