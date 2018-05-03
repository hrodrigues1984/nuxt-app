<template>
    <div class="single-post-page">
        <section class="post">
            <h1>{{loadedPost.title}}</h1>
            <div class="post-details">
                <div>Last updated on {{loadedPost.updatedDate | date}}</div>
                <div>Written by {{loadedPost.author}}</div>
            </div>
            <p>{{loadedPost.content}}</p>
        </section>
        <section class="post-feedback">
            <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@my-domain.com">feedback@my-domain.com</a></p>
        </section>
    </div>
</template>

<script>
    export default {
        // head: {
        //     title: 'A blog post'
        // },
        head () {
            return {
                title: this.loadedPost.title,
            }
        },
        asyncData(context) {
            return context.app.$axios.$get(`/posts/${context.route.params.id}.json`)
                .then(data => {
                    return {
                        loadedPost: data
                    }
                }).catch(e => context.error(e));
        // asyncData(context, callback) {
            // setTimeout(() => {
            //     // return {}
            //     callback(null, {
            //         loadedPost: {
            //             id:             '1',
            //             title:          `Hello there (ID: ${context.route.params.id})`,
            //             author:         'Hugo Rodrigues',
            //             context:        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            //             thumbnail:      'https://placeimg.com/640/480/tech',
            //             updatedDate:    new Date(),
            //             previewText:    'This is a post - first',
            //         },
            //     });
            // }, 500);
        }
    }
</script>

<style scoped>
    .single-post-page {
        padding: 30px;
        text-align: center;
        box-sizing: border-box;
    }

    .post {
        width: 100%;
    }

    @media (min-width: 768px) {
        .post {
            width: 600px;
            margin: auto;
        }
    }

    .post-title {
        margin: 0;
    }

    .post-details {
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 3px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    @media (min-width: 768px) {
        .post-details {
            /*flex-direction: row;*/
        }
    }

    .post-detail {
        color: rgb(88, 88, 88);
        margin: 0 10px;
    }

    .post-feedback a {
        color: red;
        text-decoration: none;
    }

    .post-feedback a:hover,
    .post-feedback a:active {
        color: salmon;
    }
</style>
