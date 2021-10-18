const christmas = require('../src');

for (const func in christmas) {
	console.log(func, christmas[func]());
}