/*

	Must be running web-driver:
	$ webdriver-manager start

	To run single test:
	$ protractor conf.js --specs ./newComponent-spec.js 

	To run:
	$ protractor conf.js

*/

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['newComponent-spec.js', 'editComponent-spec.js']
};