let goodStr = "Test1234";
let badStr = "tsssst";


let regex = /[a-zA-Z0-9]+[A-Z]+/;
console.log(regex.test(goodStr));
console.log(regex.test(badStr));