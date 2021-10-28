/* eslint-disable no-console */

const christmas = require('../src');

for (const func in christmas) {
	console.log(func, christmas[func]());
}

console.log('---');

const date = christmas.date();
console.log(`Christmas Day is on a ${new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date)} in ${date.getFullYear()}`);