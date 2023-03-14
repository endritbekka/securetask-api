
import * as dotenv from 'dotenv'
dotenv.config()

interface configurationI {
    server: {
        app_port: string
    },
    redis: {
        url: string
    }
}

const configuration: configurationI = {
    server: {
        app_port: process.env.APP_PORT || '3000'
    },
    redis: {
        url: process.env.REDIS_URL || ''
    }
}

export default configuration;