<template>
    <header>
        <router-link class="title" to="/home">
            <span class="article">Article</span>
        </router-link>
        <div class="nav-links" :class="showMenu">
            <router-link class="nav-item" :class="{ active: $route.name === p.name }" :to="{ name: p.name }"
                @click="removeActive" v-for="p in pages" :key="p.id">{{ p.title
                }}</router-link>
            <a href="#" class="nav-item-excluded">{{ fullName }}</a>
            <a href="#" class="nav-item-excluded" @click="logout">Logout</a>
        </div>
        <div class="controls">
            <a href="javascript:void(0);" :class="menu" id="menu" @click="isToggle = !isToggle"></a>
        </div>
    </header>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    authUser: Object
})

const emit = defineEmits(['log-out'])

const logout = () => {
    emit('log-out')
}

const fullName = computed(() => `${props.authUser.firstname}  ${props.authUser.lastname}`)

const pages = ref([
    {
        id: 1,
        title: 'All Media',
        name: 'media',
    },
    {
        id: 2,
        title: 'Writer',
        name: 'dashboard-writer',
    },
    {
        id: 3,
        title: 'Editor',
        name: 'dashboard-editor',
    },
    {
        id: 4,
        title: 'Companies',
        name: 'companies',
    },
    {
        id: 5,
        title: 'Users',
        name: 'users',
    },
])

const isToggle = ref(false);

const menu = computed(() => {
    return isToggle.value ? "bx bx-x" : "bx bx-menu";
});

const showMenu = computed(() => {
    return isToggle.value ? "active" : "";
});

const removeActive = () => {
    isToggle.value = false;
}

</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
    background: #FFFFFF;
    z-index: 999;
}


header .title .article {
    font-size: 3rem;
    margin-bottom: 0.2rem;
    color: #292929;
}

header .nav-links {
    flex: 1;
    text-align: right;
    z-index: 400;
}

header .nav-links .nav-item {
    font-size: 1.7rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0 0.2rem;
    color: var(--text-light);
}

header .nav-links .nav-item.active,
header .nav-links .nav-item:active,
header .nav-links .nav-item:hover {
    color: #fff;
    background: var(--text-dark);
    border-radius: 5px;
}

header .nav-links .nav-item {
    font-size: 1.7rem;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin: 0 0.2rem;
    color: var(--text-light);
}

header .nav-links .nav-item-excluded {
    font-size: 1.7rem;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin: 0 0.2rem;
    color: var(--text-light);
}

header .nav-links .nav-item-excluded.active,
header .nav-links .nav-item-excluded:active,
header .nav-links .nav-item-excluded:hover {
    color: var(--text-dark);

}

header .controls {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
}

header .controls #menu {
    color: var(--text-light);
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 7px;
    cursor: pointer;
    font-size: 2rem;
    text-align: center;
    color: var(--text-light);
    display: none;
}

header .controls #menu:hover {
    border: 1px solid #ccc;
}

@media screen and (max-width: 991px) {
    header {
        padding: 1rem 2rem;
    }
}

@media screen and (max-width: 450px) {
    header .navbar a {
        text-align: center;
        /* background: #eee; */
        padding: 1.5rem;
        display: block;
        font-size: 2.7rem;
        font-weight: 600;
    }
}

@media screen and (max-width: 768px) {
    header {
        z-index: 100;
    }

    header .controls #menu {
        padding: 5px;
        display: inline-block;
        font-size: 2.5rem;
    }

    header .nav-links {
        background: var(--bg-light);
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out 0.2s !important;
    }

    header .nav-links.active {
        padding: 1rem;
        top: 100%;
        transition: max-height 0.3s ease-in-out !important;
        max-height: 100vh;
        height: 100vh;
        opacity: 1;
        background: #fff;
        z-index: 9999;
    }

    header .navbar:not(.active) {
        opacity: 0;
        transition: opacity 0.4s ease-in-out !important;
    }

    header .nav-links.active {
        top: 100%;
        height: 100vh;
    }

    header .nav-links .control {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
    }

    header .nav-links .nav-item.active,
    header .nav-links .nav-item:active,
    header .nav-links .nav-item:hover {
        color: var(--text-dark);
        background: transparent;
        border-radius: 5px;
    }

}

@media screen and (max-width: 1279px) {
    header {
        padding: 1rem 4%;
    }
}

@media screen and (max-width: 1200px) {
    header {
        padding: 1rem 2%;
    }
}
</style>