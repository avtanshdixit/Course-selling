require("dotenv").config();

const config ={
        jwtuser_Secret: process.env.JWT_USER,
        jwtadmin_Secret: process.env.JWT_ADMIN,
        mongoUrl:process.env.MONGO_URL,
};


if (!config.jwtuser_Secret || !config.jwtadmin_Secret) {
  throw new Error("JWT secrets not defined in environment variables");
}

if (!config.mongoUrl) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

module.exports = config;