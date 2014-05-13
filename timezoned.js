// https://developers.google.com/maps/documentation/timezone
var gtzUrl = 'https://maps.googleapis.com/maps/api/timezone/json';
var baseParamsTZ = {sensor: false};

function callTZAPI(data, callback) {
	data = _.extend({}, baseParamsTZ, data);
	if (callback) {
		return HTTP.get(gtzUrl, {params: data}, function (error, tz) {
			callback(error, tz.data && tz.data.timeZoneId);
		});
	} else {
		var tz = HTTP.get(gtzUrl, {params: data});
		return tz.data && tz.data.timeZoneId;
	}
}

function checkCallback(cb) {
	if (Meteor.isClient && typeof cb !== "function") {
		throw new Error("TimeZoned: You must provide a callback on the client");
	}
}

if (Meteor.isServer) {
	Meteor.methods({
		"_TimeZoned_getTimeZoneForAddress": function (address) {
			this.unblock();
			return TimeZoned.getTimeZoneForAddress(address);
		}
	});
}

TimeZoned = {
	// Can add supported params like key, language, client, or signature here
	config: function (options) {
		options = options || {};
		_.extend(baseParamsTZ, options.gtzParams);
	},
	getTimeZoneForAddress: function getTimeZoneForAddress(address, callback) {
		checkCallback(callback);

		// On the client, we actually proxy through the server
		if (Meteor.isClient) {
			Meteor.call("_TimeZoned_getTimeZoneForAddress", address, callback);
			return;
		}

		var geo = new GeoCoder();

		if (callback) {
			return geo.geocode(address, function (error, result) {
				if (error) {
					callback(error);
				} else {
					if (!result || !result[0] || !result[0].latitude || !result[0].longitude) {
						callback(new Error('TimeZoned: Unable to geocode "' + address + '"'));
					} else {
						TimeZoned.getTimeZoneForCoords(result[0].latitude, result[0].longitude, callback);
					}
				}
			});
		} else {
			var result = geo.geocode(address);
			if (!result || !result[0] || !result[0].latitude || !result[0].longitude) {
				throw new Error('TimeZoned: Unable to geocode "' + address + '"');
			}
			return TimeZoned.getTimeZoneForCoords(result[0].latitude, result[0].longitude);
		}
	},
	getTimeZoneForCoords: function getTimeZoneForCoords(lat, lon, callback) {
		checkCallback(callback);
		var timestamp = Math.round(new Date().getTime()/1000.0);
		return callTZAPI({ timestamp: timestamp, location: lat+','+lon }, callback);
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getOffsetStringForTimeZone: function getOffsetStringForTimeZone(localDateTimeString, timezone) {
		return moment.tz(localDateTimeString, timezone).format("ZZ");
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getDateObjectForTimeZone: function getDateObjectForTimeZone(localDateTimeString, timezone) {
		return moment.tz(localDateTimeString, timezone).toDate();
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getDateObjectForAddress: function getDateObjectForAddress(localDateTimeString, address, callback) {
		checkCallback(callback);
		if (callback) {
			TimeZoned.getTimeZoneForAddress(address, function (error, timezone) {
				if (error) {
					callback(error);
				} else {
					callback(null, TimeZoned.getDateObjectForTimeZone(localDateTimeString, timezone));
				}
			});
		} else {
			var timezone = TimeZoned.getTimeZoneForAddress(address);
			return TimeZoned.getDateObjectForTimeZone(localDateTimeString, timezone);
		}
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getDateObjectForCoords: function getDateObjectForCoords(localDateTimeString, lat, lon, callback) {
		checkCallback(callback);
		if (callback) {
			TimeZoned.getTimeZoneForCoords(lat, lon, function (error, timezone) {
				if (error) {
					callback(error);
				} else {
					callback(null, TimeZoned.getDateObjectForTimeZone(localDateTimeString, timezone));
				}
			});
		} else {
			var timezone = TimeZoned.getTimeZoneForCoords(lat, lon);
			return TimeZoned.getDateObjectForTimeZone(localDateTimeString, timezone);
		}
	}
};