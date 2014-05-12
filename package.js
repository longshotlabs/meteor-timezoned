Package.describe({
  name: "timezoned",
  summary: "A high-level time zone package for Meteor"
});

Package.on_use(function(api) {
  api.use('moment-timezone', 'geocoder', 'underscore');
  api.export('TimeZoned');
  api.add_files(['timezoned.js']);
});