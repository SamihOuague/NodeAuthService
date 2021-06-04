let express = require("express");
let cors = require("cors");
let app = express();
let Members = require("./members/Router");
let mongoose = require("mongoose");
let Model = require("./members/Model");

mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(Members);

app.listen(8080);