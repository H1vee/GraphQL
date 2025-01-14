const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: 'localhost',
        user: 'root', // Provide your user here
        password: 'your_password', // Provide your password here
        database: 'carsharing', // Provide your db name here
        connectTimeout: 60000,
    },
    listPerPage: 10,
};
module.exports = config;
