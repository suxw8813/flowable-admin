const IpConfig = {
    develop: {
        deploymentApi: '/flowable/v1/common/',
        flowableapi: '/weflow/v1/',
    },
    staging: {
        deploymentApi: 'http://localhost:9000/weflow/v1/',
        flowableapi: 'http://localhost:9000/flowable-rest/service/'
    },
    production: {
        deploymentApi: '/weflow/v1/',
        flowableapi: '/flowable/v1/common/'
    }
}

if (process.env.NODE_ENV === 'development') {
    module.exports.config = IpConfig.develop
} else {
    if (process.env.type === 'staging') {
        module.exports.config = IpConfig.staging
    } else if (process.env.type === 'development') {
        module.exports.config = IpConfig.develop
    } else {
        module.exports.config = IpConfig.production
    }
}
