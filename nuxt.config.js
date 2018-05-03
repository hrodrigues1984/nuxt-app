const pkg = require('./package');

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Nuxt Blog',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxtjs learning blog'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans'}
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    // loading: {color: '#3B8070'},
    // loading: {color: false},
    // loading: {color: '#b77d1d', height: '4px', duration: 5000},
    loading: {color: '#b77d1d'},
    //for spa
    // loadingIndicator: {
    //     name: 'circle',
    //     color: '#b77d1d'
    // },

    /*
    ** Global CSS
    */
    css: [
        '~assets/styles/main.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~plugins/core-components.js',
        '~plugins/date-filter.js'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
    ],

    axios: {
        baseURL: process.env.BASE_URL || 'https://nuxt-blog-a8e0b.firebaseio.com',
        credentials: false,
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    env: {
        baseUrl: process.env.BASE_URL || 'https://nuxt-blog-a8e0b.firebaseio.com',
        firebaseSignUpUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
        firebaseSignInUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=',
        firebaseAPIKey: 'AIzaSyB0qPZi2R828QeDMNjGNL4i6pvtBZ7FbgI',
    },
    // transition: 'page',
    transition: {
        name: 'component-fade',
        mode: 'out-in'
    },
    router: {
        middleware: 'log',
    },
    // srcDir: 'client-app/',
    // generate: {
    //
    // }
    // rootDir: '/'
    // router: {
    //     extendRoutes(routes, resolve) {
    //         routes.push({
    //             path: '*',
    //             component: resolve(__dirname, 'pages/index.vue'),
    //         });
    //     },
    //     linkActiveClass: 'active'
    // }
};
