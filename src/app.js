const express = require('express');
const cors = require('cors');
const app = express();
const Members = require('./members/Router');

app.use(cors());
app.use(express.json());
app.use(Members);

module.exports = app;