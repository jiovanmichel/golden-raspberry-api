module.exports = {
    apps : [{
        name: "node-api",
        script: "index.js",
        log_date_format: 'DD/MMM HH:mm:ss',
        watch: false,
        ignore_watch: ['node_modules', '*.log'],
        env: {
            NODE_ENV: "development",
            watch: true, // TODO mudar para tru quando desenvolver
            ignore_watch: ['node_modules', 'err.log', '*.log']
        },
        env_development: {
            NODE_ENV: "development",
            watch: true, // TODO mudar para tru quando desenvolver
            ignore_watch: ['node_modules', 'err.log', '*.log']
        },
        env_production: {
            NODE_ENV: "production"
        },
    }]
}