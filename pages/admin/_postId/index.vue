<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmit"/>
        </section>
    </div>
</template>

<script>
    // import axios from 'axios';
    import AdminPostForm from '@/components/Admin/AdminPostForm';

    export default {
        layout: 'admin',
        middleware: [ 'check-auth', 'auth' ],
        components: {
            AdminPostForm
        },
        methods: {
            onSubmit(editedPost) {
                this.$store.dispatch('editPost', editedPost).then(() => this.$router.push('/admin'));
                // axios.put(`https://nuxt-blog-a8e0b.firebaseio.com/posts/${this.$route.params.postId}.json`, editedPost)
                //     .then(res => {
                //         console.log(res.data);
                //         this.$router.push('/admin');
                //     })
                //     .catch(e => console.log(e));
            }
        },
        asyncData(context) {
            // return axios.get(`https://nuxt-blog-a8e0b.firebaseio.com/posts/${context.route.params.postId}.json`)
            // return axios.get(`${process.env.baseUrl}/posts/${context.route.params.postId}.json`)
            return context.app.$axios.$get(`/posts/${context.route.params.postId}.json`)
                .then(data => {
                    return {
                        loadedPost: {
                            ...data,
                            id: context.route.params.postId
                        }
                    }
                }).catch(e => context.error(e));
        },
        // data() {
        //     return {
        //         loadedPost: {
        //             author: 'Hugo Rodrigues',
        //             title: 'Some title',
        //             content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        //             thumbnail: 'https://placeimg.com/640/480/tech'
        //         }
        //     }
        // }
    }
</script>

<style scoped>
    .update-form {
        width: 90%;
        margin: 20px auto;
    }
    @media (min-width: 768px) {
        .update-form {
            width: 500px;
        }
    }
</style>