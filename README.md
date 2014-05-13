TimeZoned
================

A high-level time zone package for Meteor. Aims to have the same simple API on client and server. Currently uses The Google Time Zone API for time zone geolocation and moment-timezone for `Date` handling, but could be adapted to support configurable data sources. Pull requests and issues are welcome.

## Installation

Install using Meteorite:

```bash
$ mrt add geocoder
```

## Usage

Here are some ways to use this package.

### Get A Date Object For a Local DateTime and An Address

On the client or server:

```js
TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637", function (error, date) {
	
});
```

The first argument is a [local date and time](http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local) and the second is any address that will be geocoded to determine the time zone and the proper UTC offset that was (or will be) in effect on the given date and time. The result is a Date object set to the given time at the calculated UTC offset.

On the server, the callback is optional:

```js
var date = TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637");
```

### Get A Date Object For a Local DateTime and Latitude and Longitude Coordinates

On the client or server:

```js
TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555", function (error, date) {
	
});
```

The first argument is a [local date and time](http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local), the second is the latitude, and the third is the longitude. The coordinates are used to determine the time zone and the proper UTC offset that was (or will be) in effect on the given date and time. The result is a Date object set to the given time at the calculated UTC offset.

On the server, the callback is optional:

```js
var date = TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555");
```

### Get A Date Object For a Local DateTime and A Time Zone

On the client or server:

```js
var date = TimeZoned.getDateObjectForTimeZone("2014-05-12T12:00", "America/Chicago");
```

The first argument is a [local date and time](http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local) and the second is a time zone ID from the [IANA time zone database](http://www.iana.org/time-zones). This is a synchronous function.

### Get A Time Zone For An Address

On the client or server:

```js
TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637", function (error, tz) {

});
```

The first argument is any address that will be geocoded to determine the time zone ID from the [IANA time zone database](http://www.iana.org/time-zones) for that location on earth.

On the server, the callback is optional:

```js
var tz = TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637");
```

### Get A Time Zone For Latitude and Longitude Coordinates

On the client or server:

```js
TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555", function (error, tz) {

});
```

The first argument is the latitude and the second is the longitude. The result is the time zone ID from the [IANA time zone database](http://www.iana.org/time-zones) for that location on earth.

On the server, the callback is optional:

```js
var tz = TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555");
```

### Get An Offset For A Time Zone ID

On the client or server:

```js
var offset = TimeZoned.getOffsetStringForTimeZone("2014-05-12T12:00", "America/Chicago");
```

The first argument is a [local date and time](http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local) and the second is the time zone ID from the [IANA time zone database](http://www.iana.org/time-zones). The return value is the UTC offset that was (or will be) in effect at that time, on that day, in that time zone. This is a synchronous function.

## Configuration

If you have an Google Maps API key or Google Maps API for Business credentials, you can provide them.

```js
TimeZoned.config({
  gtzParams: {
    key: '',
    client: '',
    signature: ''
  }
});
```