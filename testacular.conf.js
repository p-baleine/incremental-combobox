// base path, that will be used to resolve files and exclude
basePath = '.';

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  "build/build.js",
  "test/mocha-setup.js",
  "test/lib/sinon-1.5.0.js",
  "test/lib/chai.js",
  "test/lib/sinon-chai.js",
  "test/lib/jquery-1.8.2.min.js",
  "test/lib/chai-jquery.js",
  "test/helper.js",
  "test/**/*test.js"
];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
reporters = ['progress', 'junit'];

// web server port
// CLI --port 9876
port = 9876;

// cli runner port
// CLI --runner-port 9100
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
//browsers = ['PhantomJS'];
browsers = [];

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
captureTimeout = 5000;

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = true;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;
