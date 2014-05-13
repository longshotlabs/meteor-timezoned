Package.describe({
  name: "timezoned",
  summary: "A high-level time zone package for Meteor"
});

Package.on_use(function(api) {
  api.use(['moment-timezone', 'geocoder', 'underscore', 'http']);
  api.export('TimeZoned');
  api.add_files(['timezoned.js']);
});

Package.on_test(function(api) {
  api.use(['timezoned', 'tinytest']);
  api.add_files(['tests/timezoned-tests.js']);
});