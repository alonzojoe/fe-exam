<template>
    <Modal title="Article Form" @close-modal="closeForm">
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="title">Title</label>
                <input v-model="formData.title" id="title" type="text" placeholder="Enter article title" required />
            </div>

            <div>
                <label for="content">Content</label>
                <textarea v-model="formData.content" />
            </div>


            <div>
                <label for="link">Link</label>
                <input v-model="formData.link" id="link" type="url" placeholder="Enter article link" />
            </div>

            <div>
                <label for="image">Image URL</label>
                <input v-model="formData.image" id="image" type="url" placeholder="Enter image URL" />
            </div>

            <div>
                <label for="company">Company</label>
                <select v-model="formData.companyId" id="company" required>
                    <option value="" disabled>Select a company</option>
                    <option v-for="company in companies" :key="company.id" :value="company.id">
                        {{ company.name }}
                    </option>
                </select>
            </div>
            <div>
                <label for="status">Status</label>
                <select v-model="formData.status">
                    <option value="For Edit">For Edit</option>
                    <option value="Published" v-if="authenticatedUser.type !== 'Writer'">Published</option>
                </select>
            </div>
            <div>
                <button type="submit" :disabled="isLoading">{{ id ? 'Update Article' : 'Create Article' }}</button>

            </div>
            <div v-if="authenticatedUser.type === 'Editor' && id">
                <button type="button" @click="handlePublish">Publish Article</button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import Modal from '../../../components/UI/Modal.vue';
import { ref, computed, watch, onMounted } from 'vue';
import api from '../../../api';
import { useStore } from 'vuex';
import moment from 'moment';
import { QuillEditor } from "@vueup/vue-quill"

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
        if (typeof newArticle === 'object') {
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