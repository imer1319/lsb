<template>
    <vue3-tags-input :tags="tags" placeholder="Ingrese las palabras"
        class="p-2 pl-8 w-80 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:border-transparent">
    </vue3-tags-input>
</template>
<script>
import { defineComponent } from 'vue';
import Vue3TagsInput from 'vue3-tags-input';

export default defineComponent({
    components: {
        Vue3TagsInput
    },

    data() {
        return {
            tags: []
        }
    },
})
</script>