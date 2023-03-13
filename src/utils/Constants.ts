
import * as dotenv from 'dotenv'
dotenv.config()

interface configurationI {
    server: {
        app_port: string
    }
}

const configuration: configurationI = {
    server: {
        app_port: process.env.APP_PORT || '3000'
    }
}

export default configuration;