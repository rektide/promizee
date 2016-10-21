
So you've memoize(e)d a function which returns a promise, and you'd like the result cache to expire once the promise has been resolved/rejected?

This module can be swapped-in for the standard memoizee() just for this purpose.

Usage:
------
```
promizee(promiserFunc, [options])
```

* promiserFunc - a function which returns a Promise.
* options - optional options object passed straight to memoizee() [(documentation)](https://github.com/medikoo/memoizee#configuration)

Returns a memoized function which clears its cache after the Promise it returns is resolved/rejected.


Example:
--------

```
var promizee = require('promizee');
var Promise = require('bluebird');

function doubleIt(it) {
 	// do something that takes some time
	return Promise.delay(5000).then(function(){
		return it + it;
	});
}

var promizeedDoubleIt = promizee(doubleIt);

promizeedDoubleIt(5); // returns new Promise that resolves to 10
promizeedDoubleIt(5); // Cache hit - returns the same Promise as above
promizeedDoubleIt(6); // returns a new Promise that resolves to 12

setTimeout(function(){
	// after 6 seconds
	promizeedDoubleIt(5); // returns a new Promise that resolves to 10
	promizeedDoubleIt.clear() // manually clear the cache
	promizeedDoubleIt(5); // returns a new Promise that resolves to 10
}, 6000);
```
