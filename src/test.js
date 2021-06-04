let jwt = require("jsonwebtoken");
let config = require("./config");
jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGI5OTg0ZmZhYmM3NjE4NWZlNzM5MGUiLCJpYXQiOjE2MjI3NzgxMzAyMzV9.-D1WgOWPBYuyIb0bFKv5dsojZ7KM4oABrk7xOHg9MF8", config.secretKey, (token) => {
    console.log(token);
});
console.log(Date.now());