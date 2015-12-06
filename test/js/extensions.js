String.prototype.isUpper = function () {
	return this.toUpperCase() == this;
}

Array.prototype.distinct = function () {
	var n = {}, r = [];
	for (var i = 0; i < this.length; i++) {
		if (!n[this[i]]) {
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
}

String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function (s, i) {
		return args[i];
	});
}

Array.prototype.reduce_a_fraction = function () {
	var m = this[0];
	var n = this[1];
	var a = (m < n) ? m : n;
	while (true) {
		if (m % a == 0 && n % a == 0) break;
		a--;
	}
	return [m / a, n / a];
}

NodeList.prototype.map = function (callback) {
	for (var i = 0; i < this.length; i++) callback(this[i]);
}
