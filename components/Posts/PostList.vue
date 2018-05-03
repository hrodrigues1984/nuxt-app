<template>
    <section class="post-list">
        <!--<PostPreview-->
            <!--id="1"-->
            <!--:is-admin="isAdmin"-->
            <!--thumbnail="https://placeimg.com/640/480/tech"-->
            <!--title="Hello there"-->
            <!--previewText="This is a post"-->
        <!--/>-->
        <!--<PostPreview-->
            <!--id="2"-->
            <!--:is-admin="isAdmin"-->
            <!--thumbnail="https://placeimg.com/640/480/tech"-->
            <!--title="Hello there"-->
            <!--previewText="This is a post"-->
        <!--/>-->
        <!--<PostPreview-->
            <!--id="3"-->
            <!--:is-admin="isAdmin"-->
            <!--thumbnail="https://placeimg.com/640/480/tech"-->
            <!--title="Hello there"-->
            <!--previewText="This is a post"-->
        <!--/>-->
        <PostPreview
            v-for="post of posts"
            :key="post.id"
            :id="post.id"
            :is-admin="isAdmin"
            :thumbnail="post.thumbnail"
            :title="post.title"
            :previewText="post.previewText"
        />
    </section>
</template>

<script>
    import PostPreview from '@/components/Posts/PostPreview';

    export default {
        name: 'PostList',
        components: {
            PostPreview
        },
        props: {
            isAdmin: {
                type: Boolean,
                default: false
            },
            posts: {
                type: Array,
                required: true
            }
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


