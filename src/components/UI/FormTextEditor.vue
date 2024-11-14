<template>
    <div class="form-input">
        <label :for="id">{{ label }}</label>
        <quill-editor :id="id" v-model:content="internalContent" content-type="html" theme="snow"
            @update:content="updateValue" style="height: 100px;" required></quill-editor>
        <p>{{ msg }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";

const props = defineProps({
    modelValue: String,
    label: String,
    id: String,
});

const emit = defineEmits(["update:modelValue"]);
const internalContent = ref(props.modelValue || "");

watch(
    () => props.modelValue,
    (newVal) => {
        internalContent.value = newVal;
    }
);

const updateValue = (newContent) => {
    internalContent.value = newContent;
    emit("update:modelValue", newContent);
}
</script>

<style scoped>
@import "https://unpkg.com/@vueup/vue-quill@1.0.0-beta.9/dist/vue-quill.snow.css";

.form-input {
    margin: 0.5rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
    font-size: 1.7rem;
    color: var(--text-lighter);
    margin-bottom: 0.7rem;
}

input {
    padding: 0.9rem 0.7rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
    outline: none;
    font-size: 1.4rem;
    font-weight: 500;
}

input:focus {
    border-color: #464b50;
}
</style>