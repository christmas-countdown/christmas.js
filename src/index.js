/**
 * @module eartharoid/christmas
 * @author Isaac Saunders <contact@eartharoid.me>
 * @license MIT
 */

const spacetime = require('spacetime');

// convert a spacetime object to a Date
const d = spacetime => new Date(spacetime.format('iso'));

const now = tz => spacetime.now(tz);

const christmas = tz => {
	const now = spacetime.now(tz);
	let year = now.year();
	// if it's already Christmas, set date to next Christmas (months start at 0, because why not?)
	if (now.month() === 11 && now.date() > 24) year++;
	return spacetime(`December 25, ${year} 0:00:00`, tz);
};

let ms = [ // [name, multiplier]
	['second', 1000],
	['minute', 60],
	['hour', 60],
	['day', 24],
	['sleep', 1],
	['week', 7]
];
ms.forEach(([k, v], i) => { // do maths
	if (i > 0) ms[i] = [k, v * ms[i - 1][1]];
});
ms = ms.reduce((o, [k, v]) => { // convert to object
	o[k] = v;
	return o;
}, {});
// `month` & `year` are multiplied by a day, not the next smallest value
ms.month = 30.5 * ms.day;
ms.year = 365.25 * ms.day;

class Christmas {}

// getSeconds - getMonths
Object.entries(ms)
	.forEach(([k, v]) => {
		const f = `get${k[0].toUpperCase() + k.slice(1)}s`;
		const maybeCeil = n => k === 'sleep' ? Math.ceil(n) : n;
		Christmas[f] = tz => maybeCeil((d(christmas(tz)) - d(now(tz))) / v);
	});


Christmas.getTotal = tz => {
	let diff = d(christmas(tz)) - d(now());
	return {
		days: Math.floor(diff / ms.day),
		hours: Math.floor((diff %= ms.day) / ms.hour),
		minutes: Math.floor((diff %= ms.hour) / ms.minute),
		seconds: Math.floor((diff %= ms.minute) / ms.second)
	};
};

Christmas.getPercentage = tz =>  ((ms.year - (d(christmas(tz)) - d(now(tz)))) / ms.year) * 100;

Christmas.getWeekday = (tz, locale) => new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(d(christmas(tz)));

Christmas.isToday = tz => now().isSame(spacetime(`December 25, ${now().year()} 0:00:00`, tz), 'date');

Christmas.isTomorrow = tz => now().isSame(christmas(tz).subtract(1, 'days'), 'date');

Christmas.date = tz => d(christmas(tz));

module.exports = Christmas;