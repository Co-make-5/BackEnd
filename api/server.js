const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const restricted = require("../auth/restricted-middleware.js");
const authrouter = require("../auth/auth-router.js");
const issuesrouter = require("../issues/issues-router.js");
const usersrouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authrouter);
server.use('/api/issues', restricted, issuesrouter);
server.use('/api/users', restricted, usersrouter);

module.exports = server;