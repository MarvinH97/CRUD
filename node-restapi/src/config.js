const dotenv = require('dotenv').config();

export default {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbInstanceName: process.env.DB_INSTANCE_NAME || '',
    dbDataBase: process.env.DB_DATABASE || ''
}