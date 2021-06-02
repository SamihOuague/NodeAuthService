let express = require("express");
let cors = require("cors");
let app = express();
let auth = require("./api/authentication");
let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.post("/login", auth.signIn);

app.listen(8080);