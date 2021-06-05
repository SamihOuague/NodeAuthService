const jwt = require('jsonwebtoken');
const config = require('./config');
jwt.verify('okok', config.secretKey, (token, err) => {
    if (err) {
        console.log('');
    }
  console.log(token);
});
console.log(Date.now());
