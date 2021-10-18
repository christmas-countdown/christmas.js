# christmas.js

Get the number of months, weeks, days, hours, minutes, seconds, or the total time left until Christmas (with timezone support).

## Installation

Install with npm/pnpm/yarn:

`npm i @eartharoid/christmas`

## Usage

```js
const christmas = require('@eartharoid/christmas');
console.log(christmas.getDays());
```

### API

#### `getMonths(timezone?)`

> Get the number of months left

- `timezone?` - timezone string

#### `getWeeks(timezone?)`

> Get the number of weeks left

- `timezone?` - timezone string

#### `getSleeps(timezone?)`

> Get the number of sleeps left (one more than days as it as rounded up instead of down)

- `timezone?` - timezone string

#### `getDays(timezone?)`

> Get the number of days left

- `timezone?` - timezone string

#### `getHours(timezone?)`

> Get the number of hours left

- `timezone?` - timezone string

#### `getMinutes(timezone?)`

> Get the number of minutes left

- `timezone?` - timezone string

#### `getSeconds(timezone?)`

> Get the number of seconds left

- `timezone?` - timezone string

#### `getTotal(timezone?)`

> Get an object representing the total time left (like `{ days: 67, hours: 2, minutes: 15, seconds: 26 }`)

- `timezone?` - timezone string

#### `isToday(timezone?)`

> Is it Christmas?

- `timezone?` - timezone string

#### `isTomorrow(timezone?)`

> Is it Christmas Eve?

- `timezone?` - timezone string