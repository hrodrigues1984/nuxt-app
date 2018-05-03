import Vuex     from 'vuex';
import Cookie   from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null,
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, addedPost) {
                state.loadedPosts.push(addedPost);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/posts.json')
                    .then(data => {
                        let postsArray = [];
                        for (let key in data) {
                            postsArray.push({...data[key], id: key});
                        }
                        vuexContext.commit('setPosts', postsArray);
                    }).catch(e => context.error(e));
                // if (!process.client) {
                //     console.log(context.req);
                // }
                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         vuexContext.commit('setPosts', [
                //             { id: '1', title: 'Hello there 1', previewText: 'This is a post - first',   thumbnail: 'https://placeimg.com/640/480/tech'},
                //             { id: '2', title: 'Hello there 2', previewText: 'This is a post - second',  thumbnail: 'https://placeimg.com/640/480/tech'},
                //             { id: '3', title: 'Hello there 3', previewText: 'This is a post - third',   thumbnail: 'https://placeimg.com/640/480/tech'},
                //             { id: '4', title: 'Hello there 4', previewText: 'This is a post - fourth',  thumbnail: 'https://placeimg.com/640/480/tech'},
                //             { id: '5', title: 'Hello there 5', previewText: 'This is a post - fifth',   thumbnail: 'https://placeimg.com/640/480/tech'},
                //         ]);
                //         resolve();
                //         // reject(new Error('An error occurred'));
                //     }, 500);
                // });
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts);
            },
            addPost(vuexContext, postData) {
                return this.$axios.$post(`/posts.json?auth=${vuexContext.state.token}`, postData)
                    .then(data => {
                        vuexContext.commit('addPost', {...postData, id: data.name});
                    }).catch(err => {
                        console.log(err);
                    });
            },
            editPost(vuexContext, editedPost) {
                return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
                    .then(() => {
                        vuexContext.commit('editPost', editedPost);
                    }).catch(e => console.log(e));
            },
            authenticateUser(vuexContext, authData) {
                let authUrl = `${process.env.firebaseSignInUrl}${process.env.firebaseAPIKey}`;
                if (!authData.isLogin) {
                    authUrl = `${process.env.firebaseSignUpUrl}${process.env.firebaseAPIKey}`;
                }
                return this.$axios.$post(authUrl, {
                    email:              authData.email,
                    password:           authData.password,
                    returnSecureToken:  true
                }).then(res => {
                    // console.log(res);
                    const token =           res.idToken;
                    const tokenExpiration = new Date().getTime() + (Number.parseInt(res.expiresIn) * 1000);

                    vuexContext.commit('setToken', token);

                    localStorage.setItem('token', token);
                    localStorage.setItem('tokenExpiration', tokenExpiration);

                    Cookie.set('jwt', token);
                    Cookie.set('expirationDate', tokenExpiration);

                    // vuexContext.dispatch('setLogoutTimer', res.expiresIn * 1000);
                }).catch(e => console.log(e));
            },
            // setLogoutTimer(vuexContext, duration) {
            //     setTimeout(() => {
            //         vuexContext.commit('clearToken');
            //     }, duration)
            // },
            initAuth(vuexContext, req) {
                let token, expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
                    if (!jwtToken) {
                        return;
                    }
                    token = jwtToken.split('=')[1];
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                if (new Date() > +expirationDate || !token) {
                    // console.log('No token or invalid token');
                    vuexContext.dispatch('logout');
                    return;
                }
                // vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime());
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token !== null;
            }
        }
    });
};

export default createStore;