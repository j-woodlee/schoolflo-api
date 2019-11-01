require("dotenv").config();


module.exports = {
    development: {
        // "use_env_variable": "DATABASE_URL",
        username: "postgres",
        password: null,
        database: "schoolflo-api",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    test: {
        username: "postgres",
        password: null,
        database: "schoolflo-api-test",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
};

// export DATABASE_URL=dbURL
