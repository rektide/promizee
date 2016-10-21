var memoizee = require('memoizee');
var Promise = require('bluebird');

function promizee(promiserFunc, options) {
	var memoed;

	if (typeof options !== 'object') {
		options = {};
	}

	if (typeof options.length === 'undefined') {
		// Just like memoizee, we assume the number of arguments based on the function's length property.
		// This can be overridden by passing a length in options.
		options.length = promiserFunc.length;
	}

	memoed = memoizee(function(){
		return Promise.method(promiserFunc).apply(this, arguments).finally(function(){
			memoed.clear();
		});
	}, options);

	return memoed;
}

module.exports = promizee;
