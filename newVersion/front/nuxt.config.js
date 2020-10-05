module.exports = {
    head: {
        title: 'TodoList',
        meta: [{
            charset: 'utf-8',
        }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
        }, {
            hid: 'desc',
            name: 'description',
            content: 'sizzF의 TodoList',
        }, {
            hid: 'ogtitle',
            name: 'og:title',
            content: 'TodoList',
        }, {
            hid: 'ogdesc',
            name: 'og:description',
            content: 'sizzF의 TodoList',
        }, {
            hid: 'ogtype',
            property: 'og:type',
            content: 'website',
        }, {
            hid: 'ogimage',
            property: 'og:image',
            content: 'https://vue.nodebird.com/TodoList.png',
        }, {
            hid: 'ogurl',
            property: 'og:url',
            content: '',
        }],
        link: [{ rel: 'shortcut icon', href: '/vue-TodoList.png' }],

    },
    modules: [
        '@nuxtjs/axios',
    ],
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment'
    ],
    pulgins: [],
    vuetify: {},
    axios: {
        browserBaseURL: process.env.NODE_ENV === 'production' ? 'https://api2.nodebird.site/api' : 'http://localhost:3086/api',
        baseURL: process.env.NODE_ENV === 'production' ? 'https://api2.nodebird.site/api' : 'http://localhost:3086/api',
        https: true,
    },
    moment: {
        locales: ['ko'],
        defaultTimezone: 'Asia/Seoul'
    },
    build: {
        extend(config, { isClient, isServer, isDev }) {
            if (isServer && !isDev) {
                config.devtool = 'hidden-source-map';
            }
            //    console.log('webpack', config, isClient, isServer);

        }
    },
    server: {
        host: "localhost",
        port: process.env.PORT || 3089,
    },
};