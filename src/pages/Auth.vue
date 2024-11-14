<template>

    <div class="fluid">
        <Card class="auth-card">
            <template #header>
                <div class="header-content">
                    <h3>Archintel Articles</h3>
                    <span>Created by: Joenell Alonzo</span>
                </div>
            </template>
            <template #body>
                <form @submit.prevent="login">
                    <FormInput v-model="formData.username" label="Username" id="a-username" type="text"
                        placeholder="" />
                    <FormInput v-model="formData.password" label="Password" id="a-pasword" type="password"
                        placeholder="" />
                    <div>
                        <Button class="auth-btn" type="submit">Login</Button>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import Card from '../components/UI/Card.vue';
import FormInput from '../components/UI/FormInput.vue';
import Button from '../components/UI/Button.vue';
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

<style scoped>
.fluid {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    font-size: 5rem;
    color: var(--text-lighter);
}

h3 {
    text-align: center;
    font-size: 3rem;
    color: var(--text-lighter);
    margin-bottom: 2rem;
}

.auth-btn {
    width: 100%;
}

.auth-card {
    width: 60vh;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.header-content {
    margin-top: 1rem;
}

.header-content h3 {
    color: #000;
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 0;
}

.header-content span {
    color: var(--text-lighter);
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
}

@media screen and (max-width: 768px) {
    .auth-card {
        width: 90vh;
    }
}
</style>