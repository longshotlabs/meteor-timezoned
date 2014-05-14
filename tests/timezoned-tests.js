if (Meteor.isServer) {
	// Synchronous server tests
	Tinytest.add('TimeZoned - Sync - getTimeZoneForCoords - America/Chicago', function(test) {
	  // These coordinates are in Chicago
	  var tz = TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555");
	  test.equal(tz, "America/Chicago");
    pause();
	});

	Tinytest.add('TimeZoned - Sync - getTimeZoneForAddress - America/Chicago', function(test) {
	  // This address is in Chicago
	  var tz = TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637");
	  test.equal(tz, "America/Chicago");
    pause();
	});

	Tinytest.add('TimeZoned - Sync - getDateObjectForCoords - America/Chicago', function(test) {
	  // These coordinates are in Chicago
	  var t = TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555");
	  test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
    pause();
	});

	Tinytest.add('TimeZoned - Sync - getDateObjectForAddress - America/Chicago', function(test) {
	  // This address is in Chicago
	  var t = TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637");
	  test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
    pause();
	});

  // Now we repeat the synchronous tests for a different timezone in case we are in
  // one of the time zones and that is causing false positives
  Tinytest.add('TimeZoned - Sync - getTimeZoneForCoords - America/New_York', function(test) {
    // These coordinates are in Chicago
    var tz = TimeZoned.getTimeZoneForCoords("40.7795269", "-73.9976788");
    test.equal(tz, "America/New_York");
    pause();
  });

  Tinytest.add('TimeZoned - Sync - getTimeZoneForAddress - America/New_York', function(test) {
    // This address is in Chicago
    var tz = TimeZoned.getTimeZoneForAddress("1000 5th Ave, New York, NY 10028");
    test.equal(tz, "America/New_York");
    pause();
  });

  Tinytest.add('TimeZoned - Sync - getDateObjectForCoords - America/New_York', function(test) {
    // These coordinates are in Chicago
    var t = TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "40.7795269", "-73.9976788");
    test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0400"));
    pause();
  });

  Tinytest.add('TimeZoned - Sync - getDateObjectForAddress - America/New_York', function(test) {
    // This address is in Chicago
    var t = TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "1000 5th Ave, New York, NY 10028");
    test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0400"));
    pause();
  });
}

// Client/server synchronous tests
Tinytest.add('TimeZoned - Sync - getOffsetStringForTimeZone - America/Chicago', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getOffsetStringForTimeZone("2014-05-12T12:00", "America/Chicago");
  test.equal(t, "-0500");
  pause();
});

Tinytest.add('TimeZoned - Sync - getDateObjectForTimeZone - America/Chicago', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getDateObjectForTimeZone("2014-05-12T12:00", "America/Chicago");
  test.instanceOf(t, Date);
  test.equal(t, new Date("2014-05-12T12:00-0500"));
  pause();
});

// Now we repeat the client/server synchronous tests for a different timezone in case we are in
// one of the time zones and that is causing false positives
Tinytest.add('TimeZoned - Sync - getOffsetStringForTimeZone - America/New_York', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getOffsetStringForTimeZone("2014-05-12T12:00", "America/New_York");
  test.equal(t, "-0400");
  pause();
});

Tinytest.add('TimeZoned - Sync - getDateObjectForTimeZone - America/New_York', function(test) {
  // At noon on 2014-05-12, the America/Chicago timezone is on CDT, which is UTC-5
  var t = TimeZoned.getDateObjectForTimeZone("2014-05-12T12:00", "America/New_York");
  test.instanceOf(t, Date);
  test.equal(t, new Date("2014-05-12T12:00-0400"));
  pause();
});

// Asynchronous client and server tests
Tinytest.addAsync('TimeZoned - Async - getTimeZoneForCoords - America/Chicago', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getTimeZoneForCoords("41.8337329", "-87.7321555", function gtReturn (error, tz) {
  	test.equal(tz, "America/Chicago");
    pause();
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getTimeZoneForAddress - America/Chicago', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getTimeZoneForAddress("5700 S Lake Shore Dr, Chicago, IL 60637", function gtReturn (error, tz) {
  	test.equal(tz, "America/Chicago");
    pause();
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForCoords - America/Chicago', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "41.8337329", "-87.7321555", function gtReturn (error, t) {
  	test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
    pause();
  	onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForAddress - America/Chicago', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "5700 S Lake Shore Dr, Chicago, IL 60637", function gtReturn (error, t) {
  	test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0500"));
    pause();
  	onComplete();
  });
});

// Now we repeat the asynchronous tests for a different timezone in case we are in
// one of the time zones and that is causing false positives
Tinytest.addAsync('TimeZoned - Async - getTimeZoneForCoords - America/New_York', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getTimeZoneForCoords("40.7795269", "-73.9976788", function gtReturn (error, tz) {
    test.equal(tz, "America/New_York");
    pause();
    onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getTimeZoneForAddress - America/New_York', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getTimeZoneForAddress("1000 5th Ave, New York, NY 10028", function gtReturn (error, tz) {
    test.equal(tz, "America/New_York");
    pause();
    onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForCoords - America/New_York', function(test, onComplete) {
  // These coordinates are in Chicago
  TimeZoned.getDateObjectForCoords("2014-05-12T12:00", "40.7795269", "-73.9976788", function gtReturn (error, t) {
    test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0400"));
    pause();
    onComplete();
  });
});

Tinytest.addAsync('TimeZoned - Async - getDateObjectForAddress - America/New_York', function(test, onComplete) {
  // This address is in Chicago
  TimeZoned.getDateObjectForAddress("2014-05-12T12:00", "1000 5th Ave, New York, NY 10028", function gtReturn (error, t) {
    test.instanceOf(t, Date);
    test.equal(t, new Date("2014-05-12T12:00-0400"));
    pause();
    onComplete();
  });
});

function pause() {
  // NOTE: We sleep for 500ms after each test to avoid being throttled by the Google API
  sleep(500);
}

function sleep(ms) {
  var done = Date.now() + ms;
  while (Date.now() < done) { /* do nothing */
  }
}