// https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
// https://stackoverflow.com/questions/37172928/angular-cli-server-how-to-proxy-api-requests-to-another-server
// https://stackoverflow.com/a/45666176

// const PROXY_CONFIG = {
//     "/api/*": {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//         // pathRewrite: {"^/api" : ""}
//     },
//     "/images/*": {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//     },
//     "/assets/*": {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//     }
// };

const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/images"
        ],
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
    }
]

module.exports = PROXY_CONFIG;