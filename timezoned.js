// https://developers.google.com/maps/documentation/timezone
var gtzUrl = 'https://maps.googleapis.com/maps/api/timezone/json';
var baseParamsTZ = {sensor: false};

function callTZAPI(data, callback) {
	data = _.extend({}, baseParamsTZ, data);
	if (callback) {
		return HTTP.get(gtzUrl, {params: data}, function (error, tz) {
			callback(error, tz.data);
		});
	} else {
		var tz = HTTP.get(gtzUrl, {params: data});
		return tz.data;
	}
}

function checkCallback(cb) {
	if (Meteor.isClient && typeof cb !== "function") {
		throw new Error("TimeZoned: You must provide a callback on the client");
	}
}

TimeZoned = {
	// Can add supported params like key, language, client, or signature here
	config: function (options) {
		options = options || {};
		_.extend(baseParamsTZ, options.gtzParams);
	},
	getTimeZoneForAddress: function getTimeZoneForAddress(address, callback) {
		checkCallback(callback);

		var geo = new GeoCoder();

		if (callback) {
			// TODO need to add client side/callback API for geocoder
			return geo.geocode(address, function (error, result) {
				if (error) {
					callback(error);
				} else {
					TimeZoned.getTimeZoneForCoords(result.latitude, result.longitude, callback);
				}
			});
		} else {
			var result = geo.geocode(address);
			if (!result || !result.latitude || !result.longitude) {
				throw new Error('TimeZoned: Unable to geocode "' + address + '"');
			}
			return TimeZoned.getTimeZoneForCoords(result.latitude, result.longitude, callback);
		}
	},
	getTimeZoneForCoords: function getTimeZoneForCoords(lat, lon, callback) {
		checkCallback(callback);
		var timestamp = Math.round(new Date().getTime()/1000.0);
		return callTZAPI({ timestamp: timestamp, location: lat+','+lon }, callback);
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getOffsetStringForTimeZone: function getOffsetStringForTimeZone(localDateTimeString, timezone) {

	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getDateObjectForTimeZone: function getDateObjectForTimeZone(localDateTimeString, timezone) {
		//TODO support callback
		var offset = TimeZoned.getOffsetStringForTimeZone(localDateTimeString, timezone);
		return new Date(localDateTimeString+offset);
	},
	// http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
	getDateObjectForAddress: function getDateObjectForTimeZone(localDateTimeString, address) {
		//TODO support callback
		var timezone = TimeZoned.getTimeZoneForAddress(address);
		var offset = TimeZoned.getOffsetStringForTimeZone(localDateTimeString, timezone);
		return new Date(localDateTimeString+offset);
	}
};