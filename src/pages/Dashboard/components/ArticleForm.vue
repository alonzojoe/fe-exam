<template>
    <Modal title="Article Form" @close-modal="closeForm">
        <!-- <pre>{{ formData }}</pre> -->
        <form @submit.prevent="handleSubmit">
            <FormInput v-model="formData.title" label="Title" id="title" type="text" placeholder="" />
            <FormTextEditor v-model="formData.content" label="Content" id="content" />
            <FormInput v-model="formData.link" label="Link" id="link" type="link" placeholder="" />
            <FormInput v-model="formData.image" label="Image" id="image" type="link" placeholder="" />
            <FormSelect v-model="formData.companyId" label="Company" id="company" :options="companyOptions" />
            <FormSelect v-model="formData.status" label="Status" id="company" :options="statusOptions" />
            <div class="btn-container">
                <Button type="submit" :disabled="isLoading">{{ id ? 'Update Article' : 'Create Article' }}</Button>
                <Button type="button" mode="publish" @click="handlePublish" :disabled="isLoading"
                    v-if="(authenticatedUser.type === 'Editor' && id) && article.status !== 'Published'">Publish
                    Article</Button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import Modal from '../../../components/UI/Modal.vue';
import FormInput from '../../../components/UI/FormInput.vue';
import FormTextEditor from '../../../components/UI/FormTextEditor.vue';
import FormSelect from '../../../components/UI/FormSelect.vue';
import Button from '../../../components/UI/Button.vue';
import { ref, computed, watch, onMounted } from 'vue';
import api from '../../../api';
import { useStore } from 'vuex';
import moment from 'moment';

const props = defineProps({
    id: String,
    article: Object
});
const emit = defineEmits(['close']);

const store = useStore();
const authenticatedUser = computed(() => store.getters.getAuthUser);

const formData = ref({
    title: '',
    content: '',
    link: '',
    image: '',
    status: 'For Edit',
    writerId: authenticatedUser.value ? authenticatedUser.value.id : '',
    editorId: '',
    date: moment().format('YYYY-MM-DD'),
    companyId: '',
});


const companies = ref([]);
const isLoading = ref(false);

const companyOptions = computed(() =>
    companies.value.map(c => ({
        id: c.id,
        text: c.name,
        hidden: false
    }))
)

const statusOptions = ref([
    {
        id: 'For Edit',
        text: 'For Edit',
        hidden: false,
    },
    {
        id: 'Published',
        text: 'Published',
        hidden: authenticatedUser.value.type === 'Writer' ? true : false
    }
])

const fetchCompanies = async () => {
    try {

        const response = await api.get("/companies");
        companies.value = await response.data.documents.map((doc) => {
            const fields = doc.fields;
            return {
                id: doc.name.split('/').pop(),
                logo: fields.logo.stringValue,
                name: fields.name.stringValue,
                status: fields.status.stringValue,
            };
        });
    } catch (error) {
        console.error('Error fetching companies:', error.message);
    }
}



onMounted(async () => {
    fetchCompanies()
});


const handleSubmit = async () => {
    if (formData.value.content.trim() === '') {
        alert('Content is required!')
        return;
    }

    isLoading.value = true;
    const articleData = {
        fields: {
            title: { stringValue: formData.value.title },
            content: { stringValue: formData.value.content },
            link: { stringValue: formData.value.link },
            image: { stringValue: formData.value.image },
            status: { stringValue: formData.value.status },
            date: { timestampValue: moment(formData.value.date).toISOString() },
            writer: { referenceValue: `projects/article-db-6e0cd/databases/(default)/documents/users/${formData.value.writerId}` },
            editor: { referenceValue: `projects/article-db-6e0cd/databases/(default)/documents/users/${authenticatedUser.value.id}` },
            company: { referenceValue: `projects/article-db-6e0cd/databases/(default)/documents/companies/${formData.value.companyId}` },
        },
    };

    try {
        if (props.id) {

            await api.patch(`/articles/${props.id}`, articleData);
            formData.value.status === 'For Edit' ? alert("Article updated successfully") : alert(`Article ${formData.value.title} published successfully!`);
        } else {

            await api.post("/articles", articleData);
            alert("Article created successfully");
        }
        closeForm();
    } catch (error) {
        console.error("Error saving article:", error.message);
    } finally {
        isLoading.value = false;
    }
};

const handlePublish = async () => {
    const confirm = window.confirm(`Are you sure to publish this article titled: ${formData.value.title}? `)

    if (!confirm) return;

    formData.value.status = "Published";
    try {
        handleSubmit();

    } catch (error) {
        throw new Error(`Could not publish article ${error.message}`)
    }
}


const closeForm = () => {
    formData.value = {
        title: '',
        content: '',
        link: '',
        image: '',
        status: 'For Edit',
        writerId: authenticatedUser.value ? authenticatedUser.value.id : '',
        editorId: authenticatedUser.value ? authenticatedUser.value.id : '',
        date: new Date().toISOString(),
        companyId: '',
    };
    emit('close');
};


watch(() => props.article, (newArticle) => {
    if (newArticle) {
        if (typeof newArticle === 'object' && props.id) {
            console.log('newARticle', newArticle)
            formData.value = {
                ...newArticle,
                writerId: newArticle.writerId,
                editorId: newArticle.editorId,
                companyId: newArticle.companyId,
                date: moment(newArticle.date).format('YYYY-MM-DD')
            };
        }
    }

}, { immediate: true });

</script>

<style scoped></style>