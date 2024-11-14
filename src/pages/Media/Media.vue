<template>
    <section>
        <h2 class="heading">
            All Media
        </h2>
        <h5 class="sub-heading">
            List of all articles
        </h5>

        <ArticleForm :id="selectedArticleID" :article="selectedArticle" v-if="isShow" @close="closeForm" />

        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Date</th>
                        <th>Writer</th>
                        <th>Editor</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="9">Loading data...</td>
                    </tr>
                    <tr v-if="!isLoading && allArticles.length === 0">
                        <td colspan="9">No Articles For Edit</td>
                    </tr>
                    <tr v-for="(article, index) in allArticles" :key="article.id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="article.image" alt="Article Image" width="100" /></td>
                        <td>{{ article.title }}</td>
                        <td><a :href="article.link" target="_blank">{{ article.link }}</a></td>
                        <td>{{ new Date(article.date).toLocaleDateString() }}</td>
                        <td>{{ article.writer }}</td>
                        <td>{{ article.editor }}</td>
                        <td>
                            <Badge :type="article.status">{{ article.status }}</Badge>
                        </td>
                        <td>
                            <Button @click="showForm(article)"
                                v-if="(article.status === 'For Edit' && authenticatedUser.type === 'Writer') || (authenticatedUser.type === 'Editor')">Edit</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleForm from '../Dashboard/components/ArticleForm.vue';
import Badge from '../../components/UI/Badge.vue'
import Button from '../../components/UI/Button.vue';
import api from '../../api';
import { useStore } from 'vuex';


const store = useStore();
const authenticatedUser = computed(() => store.getters.getAuthUser);

const isLoading = ref(false);
const allArticles = ref([]);


const fetchArticles = async () => {
    isLoading.value = true;
    try {
        const response = await api.get('/articles');
        const articles = await Promise.all(response.data.documents.map(async (doc) => {
            const fields = doc.fields;
            console.log('fields', fields)
            const companyId = fields.company ? fields.company.referenceValue.split('/').pop() : '';
            const editorId = fields.editor ? fields.editor.referenceValue.split('/').pop() : '';
            const writerId = fields.writer ? fields.writer.referenceValue.split('/').pop() : '';


            const companyResponse = companyId ? await api.get(`/companies/${companyId}`) : { data: { fields: { name: { stringValue: '' } } } };
            const editorResponse = editorId ? await api.get(`/users/${editorId}`) : { data: { fields: { firstname: { stringValue: '' }, lastname: { stringValue: '' } } } };
            const writerResponse = writerId ? await api.get(`/users/${writerId}`) : { data: { fields: { firstname: { stringValue: '' }, lastname: { stringValue: '' } } } };

            const article = {
                id: doc.name.split('/').pop(),
                title: fields.title.stringValue,
                content: fields.content.stringValue,
                link: fields.link.stringValue,
                company: companyResponse.data.fields.name.stringValue,
                editor: `${editorResponse.data.fields.firstname.stringValue} ${editorResponse.data.fields.lastname.stringValue}`,
                writer: `${writerResponse.data.fields.firstname.stringValue} ${writerResponse.data.fields.lastname.stringValue}`,
                status: fields.status.stringValue,
                date: fields.date.timestampValue,
                image: fields.image.stringValue,
                companyId,
                editorId,
                writerId
            };

            return article;
        }));


        allArticles.value = articles

    } catch (error) {
        throw new Error(`Could not fetch articles ${error.message}`);
    } finally {
        isLoading.value = false;
    }
};

const isShow = ref(false);
const selectedArticleID = ref(null);
const selectedArticle = ref({});

const showForm = (article) => {
    selectedArticleID.value = article.id;
    selectedArticle.value = article;
    isShow.value = true;
};

const closeForm = () => {
    isShow.value = false;
    fetchArticles();
};

onMounted(async () => {
    await fetchArticles();
});

</script>

<style scoped></style>