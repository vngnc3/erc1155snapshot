import fs from 'fs';

const arrayData = fs.readFileSync('temp.json');
const array = JSON.parse(arrayData);
console.log(array);
console.log(array.length);