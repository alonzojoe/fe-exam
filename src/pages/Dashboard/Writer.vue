<template>
    <section>


        <div class="header-container">
            <h2 class="heading">
                Writer's Dashboard
            </h2>
            <Button @click="showForm">Add New Article +</Button>
        </div>


        <ArticleForm :id="selectedArticleID" :article="selectedArticle" v-if="isShow" @close="closeForm" />

        <h5 class="sub-heading mt-2">
            List of Articles for Editing
        </h5>
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
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8">Loading data...</td>
                    </tr>
                    <tr v-if="!isLoading && forEditArticles.length === 0">
                        <td colspan="8">No Articles For Edit</td>
                    </tr>
                    <tr v-for="(article, index) in forEditArticles" :key="article.id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="article.image" alt="Article Image" class="table-image" /></td>
                        <td>{{ article.title }}</td>
                        <td><a :href="article.link" target="_blank">{{ article.link }}</a></td>
                        <td>{{ new Date(article.date).toLocaleDateString() }}</td>
                        <td>{{ article.writer }}</td>
                        <td>{{ article.editor }}</td>
                        <td><Button @click="showForm(article)">Edit</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="separator"></div>

        <h5 class="sub-heading">
            List of Published Articles
        </h5>
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="7">Loading data...</td>
                    </tr>
                    <tr v-if="!isLoading && publishedArticles.length === 0">
                        <td colspan="7">No Published Articles</td>
                    </tr>
                    <tr v-for="(article, index) in publishedArticles" :key="article.id">
                        <td>{{ index + 1 }}</td>
                        <td><img :src="article.image" alt="Article Image" class="table-image" /></td>
                        <td>{{ article.title }}</td>
                        <td><a :href="article.link" target="_blank">{{ article.link }}</a></td>
                        <td>{{ new Date(article.date).toLocaleDateString() }}</td>
                        <td>{{ article.writer }}</td>
                        <td>{{ article.editor }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import Button from '../../components/UI/Button.vue';
import ArticleForm from './components/ArticleForm.vue';
import { ref, onMounted } from 'vue';
import api from '../../api';


const isLoading = ref(false);
const forEditArticles = ref([]);
const publishedArticles = ref([]);

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


        forEditArticles.value = articles.filter(article => article.status === 'For Edit');
        publishedArticles.value = articles.filter(article => article.status === 'Published');
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
    selectedArticleID.value = article?.id;
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