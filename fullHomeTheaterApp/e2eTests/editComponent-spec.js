/*
	e2e test to make sure the edits are correct and propogating through
	the database. Also should make sure the delete is working.
*/

describe('Home Theater App "Edit Component" Page', function() {
	it('should successfully delete the selected component', function() {
		browser.get('http://localhost:3000/home/#/editComponentView');

		var componentId = element(by.model('componentId'));
		var componentSelect = element(by.model('componentSelect.value'));
		var brand = element(by.model('brand'));
		var cost = element(by.model('cost'));
		var performance = element(by.model('performance'));
		var reliability = element(by.model('reliability'));
		var height = element(by.model('height'));
		var width = element(by.model('width'));
		var thickness = element(by.model('thickness'));
		var weight = element(by.model('weight'));
		var powerHandling = element(by.model('powerHandling'));
		var powerHandlingMin = element(by.model('powerHandlingMin'));
		var powerHandlingMax = element(by.model('powerHandlingMax'));
		var inputType = element(by.model('inputType'));
		var inputQuantity = element(by.model('inputQuantity'));
		var outputType = element(by.model('outputType'));
		var outputQuantity = element(by.model('outputQuantity'));
		var	addInputBtn = element(by.id('addInput'));
		var addOutputBtn = element(by.id('addOutput'));
		var deleteComponentBtn = element(by.id('deleteComponent'));
		var updateComponentBtn = element(by.id('updateComponent'));

		/*
			Declare variables and set up promise and returns to check
			the ng-repeat dynamically.
		*/
		var lastRow, tempListLength;
		var listLength = element.all(by.repeater('component in components')).count();
		listLength.then(function(value) {
			lastRow = element(by.repeater('component in components').row(value - 1));
			tempListLength = value;

		}).then(function() {

			lastRow.click();

			/*
				expect entire form to be filled
			*/
			expect(componentSelect.getAttribute('value')).toEqual('0'); // index based
			expect(brand.getAttribute('value')).toEqual('deleteBrand');
			expect(cost.getAttribute('value')).toEqual('9000');
			expect(performance.getAttribute('value')).toEqual('10');
			expect(reliability.getAttribute('value')).toEqual('1');
			expect(height.getAttribute('value')).toEqual('72');
			expect(width.getAttribute('value')).toEqual('48');
			expect(thickness.getAttribute('value')).toEqual('6');
			expect(weight.getAttribute('value')).toEqual('25');
			expect(powerHandling.getAttribute('value')).toEqual('123');
			expect(powerHandlingMin.getAttribute('value')).toEqual('5');
			expect(powerHandlingMax.getAttribute('value')).toEqual('220');

			/*
				click delete key and expect form to be empty
			*/
			deleteComponentBtn.click();

			expect(componentId.getAttribute('value')).toEqual('');
			expect(componentSelect.getAttribute('value')).toEqual('0'); // index based
			expect(brand.getAttribute('value')).toEqual('');
			expect(cost.getAttribute('value')).toEqual('');
			expect(performance.getAttribute('value')).toEqual('');
			expect(reliability.getAttribute('value')).toEqual('');
			expect(height.getAttribute('value')).toEqual('');
			expect(width.getAttribute('value')).toEqual('');
			expect(thickness.getAttribute('value')).toEqual('');
			expect(weight.getAttribute('value')).toEqual('');
			expect(powerHandling.getAttribute('value')).toEqual('');
			expect(powerHandlingMin.getAttribute('value')).toEqual('');
			expect(powerHandlingMax.getAttribute('value')).toEqual('');

			/*
				Count to ensure it's no longer in the list.
			*/
			var count = element.all(by.repeater('component in components')).count();
			count.then(function (value) {
				return value;
			});

			expect(count).toEqual(tempListLength - 1);
		});
	});
});