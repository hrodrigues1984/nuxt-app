<template>
    <section class="post-list">
        <PostPreview
            id="1"
            thumbnail="https://placeimg.com/640/480/tech"
            title="Hello there"
            previewText="This is a post"
        />
        <PostPreview
            id="2"
            thumbnail="https://placeimg.com/640/480/tech"
            title="Hello there"
            previewText="This is a post"
        />
        <PostPreview
            id="3"
            thumbnail="https://placeimg.com/640/480/tech"
            title="Hello there"
            previewText="This is a post"
        />
    </section>
</template>

<script>
    import PostPreview from '@/components/Posts/PostPreview';

    export default {
        name: 'PostList',
        components: {
            PostPreview
        }
    }
</script>

<style scoped>
    .post-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>


