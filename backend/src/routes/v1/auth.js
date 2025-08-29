const express = require("express");
const { register, login } = require("../../controller/authController")
const auth_router = express.Router();

//  POST /auth/register
auth_router.post("/register", register);

//POST /auth/login
auth_router.post("/login", login);

module.exports = auth_router;
