if (Meteor.isServer) {
	// Synchronous server tests
	Tinytest.add('TimeZoned - Sync - getTimeZoneForCoords', function(test) {
	  // These coordinates are in Chicago
  	  var tz = TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555");
  	  test.equal(tz, "America/Chicago");
	});

	Tinytest.add('TimeZoned - Sync - getTimeZoneForAddress', function(test) {
	  // This address is in Chicago
	  var tz = TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637");
	  test.equal(tz, "America/Chicago");
	});

	Tinytest.add('TimeZoned - Sync - getDateObjectForCoords', function(test) {
	  // These coordinates are in Chicago
  	  var t = TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555");
  	  test.instanceOf(t, Date);
      test.equal(t, new Date("2014-05-12T12:00-0500"));
	});

	Tinytest.add('TimeZoned - Sync - getDateObjectForAddress', function(test) {
	  // This address is in Chicago
	  var t = TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637");
	  test.instanceOf(t, Date);
      test.equal(t, new Date("2014-05-12T12:00-0500"));
	});
}

Tinytest.add('TimeZoned - Sync - getOffsetStringForTimeZone', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getOffsetStringForTimeZone("2014-05-12T12:00", "America/Chicago");
  test.equal(t, "-0500");
});

Tinytest.add('TimeZoned - Sync - getDateObjectForTimeZone', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getDateObjectForTimeZone("2014-05-12T12:00", "America/Chicago");
  test.instanceOf(t, Date);
  test.equal(t, new Date("2014-05-12T12:00-0500"));
});

// Asynchronous client and server tests
Tinytest.addAsync('TimeZoned - Async - getTimeZoneForCoords', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555", function gtReturn (error, tz) {
  	test.equal(tz, "America/Chicago");
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getTimeZoneForAddress', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637", function gtReturn (error, tz) {
  	test.equal(tz, "America/Chicago");
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForCoords', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555", function gtReturn (error, t) {
  	test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForAddress', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637", function gtReturn (error, t) {
  	test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
  	onComplete();
  });
});