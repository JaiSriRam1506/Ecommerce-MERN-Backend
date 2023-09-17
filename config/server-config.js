const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    SALT_ROUNDS:process.env.SALT_ROUNDS
}