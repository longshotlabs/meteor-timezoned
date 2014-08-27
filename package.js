Package.describe({
  name: "aldeed:timezoned",
  summary: "A high-level time zone package for Meteor",
  version: "0.1.2",
  git: "https://github.com/aldeed/meteor-timezoned.git"
});

Package.on_use(function(api) {
  if (api.versionsFrom) {
    api.use('mrt:moment-timezone@0.2.1');
    api.use('aldeed:geocoder@0.3.1');
    api.use('underscore@1.0.0');
    api.use('http@1.0.0');
  } else {
    api.use(['moment-timezone', 'geocoder', 'underscore', 'http']);
  }
  
  api.add_files(['timezoned.js']);
  api.export('TimeZoned');
});

Package.on_test(function(api) {
  if (api.versionsFrom) {
    api.use('aldeed:timezoned');
    api.use('tinytest@1.0.0');
  } else {
    api.use(['timezoned', 'tinytest']);
  }
  api.add_files(['tests/timezoned-tests.js']);
});