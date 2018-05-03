<template>
    <div class="posts-page">
        <PostList :posts="loadedPosts"/>
    </div>
</template>

<script>

    export default {
        middleware: 'log',
        computed: {
            loadedPosts() {
                return this.$store.getters.loadedPosts;
            }
        },
        // asyncData(context) {
        // fetch(context) {
        //     // if (context.store.state.loadedPosts.length > 0) {
        //     //     return null;
        //     // }
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve({
        //                 loadedPosts: [
        //                     { id: '1', title: 'Hello there 1', previewText: 'This is a post - first',   thumbnail: 'https://placeimg.com/640/480/tech'},
        //                     { id: '2', title: 'Hello there 2', previewText: 'This is a post - second',  thumbnail: 'https://placeimg.com/640/480/tech'},
        //                     { id: '3', title: 'Hello there 3', previewText: 'This is a post - third',   thumbnail: 'https://placeimg.com/640/480/tech'},
        //                     { id: '4', title: 'Hello there 4', previewText: 'This is a post - fourth',  thumbnail: 'https://placeimg.com/640/480/tech'},
        //                     { id: '5', title: 'Hello there 5', previewText: 'This is a post - fifth',   thumbnail: 'https://placeimg.com/640/480/tech'},
        //                 ],
        //             });
        //             // reject(new Error('An error occurred'));
        //         }, 500);
        //     }).then(data => {
        //         // return data;
        //         context.store.commit('setPosts', data.loadedPosts);
        //     }).catch(e => {
        //         console.log(e);
        //         context.error(e);
        //     });

            // setTimeout(() => {
            //     callback(null, {
            //         loadedPosts: [
            //             { id: '1', title: 'Hello there 1', previewText: 'This is a post - first',   thumbnail: 'https://placeimg.com/640/480/tech'},
            //             { id: '2', title: 'Hello there 2', previewText: 'This is a post - second',  thumbnail: 'https://placeimg.com/640/480/tech'},
            //             { id: '3', title: 'Hello there 3', previewText: 'This is a post - third',   thumbnail: 'https://placeimg.com/640/480/tech'},
            //             { id: '4', title: 'Hello there 4', previewText: 'This is a post - fourth',  thumbnail: 'https://placeimg.com/640/480/tech'},
            //             { id: '5', title: 'Hello there 5', previewText: 'This is a post - fifth',   thumbnail: 'https://placeimg.com/640/480/tech'},
            //         ],
            //     });
            // }, 500);
        // },
        // created() {
        //     this.$store.dispatch('setPosts', this.loadedPosts);
        // }
    }
</script>

<style scoped>
    .posts-page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
