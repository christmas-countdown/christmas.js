/**
 * @module @eartharoid/christmas
 * @author Isaac Saunders <contact@eartharoid.me>
 * @license MIT
 */

const spacetime = require('spacetime');

const one_day = 24 * 3600;
const one_hour = 3600;
const one_minute = 60;

/**
 * @private
 * @param {string} [timezone]
 * @returns {spacetime.Spacetime}
 */
const christmas = timezone => {
	const now = spacetime.now(timezone);
	let year = now.year();
	if (now.month() === 11 && now.date() > 24) year++; // if it's already Christmas, set date to next Christmas (months start at 0, because why not?)
	return spacetime(`December 25, ${year} 0:00:00`, timezone);
};

/**
 * @private
 * @param {string} period
 * @param {string} [timezone]
 * @returns {number}
 */
const get = (period, timezone) => {
	const now = spacetime.now(timezone);
	return now.diff(christmas(timezone), period);
};

/**
 * Get the number of seconds left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of seconds left (rounded down)
 */
module.exports.getSeconds = timezone => get('seconds', timezone);

/**
 * Get the number of minutes left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of minutes left (rounded down)
 */
module.exports.getMinutes = timezone => get('minutes', timezone);

/**
 * Get the number of hours left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of hours left (rounded down)
 */
module.exports.getHours = timezone => get('hours', timezone);

/**
 * Get the number of days left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of days left (rounded down)
 */
module.exports.getDays = timezone => get('days', timezone);

/**
 * Get the number of sleeps left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of days left (rounded up)
 */
module.exports.getSleeps = timezone => module.exports.getDays(timezone) + 1;

/**
 * Get the number of weeks left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of weeks left (rounded down)
 */
module.exports.getWeeks = timezone => get('weeks', timezone);

/**
 * Get the number of months left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {number} The number of months left (rounded down)
 */
module.exports.getMonths = timezone => get('months', timezone);

/**
 * @typedef Total
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 */

/**
 * Get the total time left until Christmas
 * @param {string} [timezone] The timezone name
 * @returns {Total}
 */
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

/**
 * Check if it is Christmas Day
 * @param {string} [timezone] The timezone name
 * @returns {boolean} Is it Christmas?
 */
module.exports.isToday = timezone => {
	const now = spacetime.now(timezone);
	return now.isSame(spacetime(`December 25, ${now.year()} 0:00:00`, timezone), 'date'); // don't use christmas() as it could be next year
};

/**
 * Check if it is Christmas Eve
 * @param {string} [timezone] The timezone name
 * @returns {boolean} Is it Christmas Eve?
 */
module.exports.isTomorrow = timezone => {
	const now = spacetime.now(timezone);
	return now.isSame(christmas(timezone).subtract(1, 'days'), 'date');
};

/**
 * Get a Date object representing Christmas Day
 * @param {string} [timezone] The timezone name
 * @returns {Date} Christmas
 */
module.exports.date = timezone => new Date(christmas(timezone).format('iso'));