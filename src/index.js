const spacetime = require('spacetime');

const one_day = 24 * 3600;
const one_hour = 3600;
const one_minute = 60;

const christmas = timezone => {
	const now = spacetime.now(timezone);
	let year = now.year();
	if (now.month() === 11 && now.date() > 24) year++; // if it's already Christmas, set date to next Christmas (months start at 0, because why not?)
	return spacetime(`December 25, ${year} 0:00:00`, timezone);
};

const lengths = ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

for (const length of lengths) {
	const function_name = 'get' + length[0].toUpperCase() + length.slice(1);
	module.exports[function_name] = timezone => {
		const now = spacetime.now(timezone);
		return now.diff(christmas(timezone), length);
	};
}

module.exports.getSleeps = timezone => module.exports.getDays(timezone) + 1;

module.exports.getTotal = timezone => {
	// christmas(timezone).since(now).diff
	let diff = spacetime.now(timezone).diff(christmas(timezone), 'seconds');
	return {
		days: Math.floor(diff / one_day),
		hours: Math.floor((diff %= one_day) / one_hour),
		minutes: Math.floor((diff %= one_hour) / one_minute),
		seconds: Math.floor(diff %= one_minute)
	};
};

module.exports.isToday = timezone => {
	const now = spacetime.now(timezone);
	return now.isSame(spacetime(`December 25, ${now.year()} 0:00:00`, timezone), 'date'); // don't use christmas() as it could be next year
};

module.exports.isTomorrow = timezone => {
	const now = spacetime.now(timezone);
	return now.isSame(christmas(timezone).subtract(1, 'days'), 'date');
};

module.exports.date = timezone => new Date(christmas(timezone).format('iso'));