/*
	e2e test to make sure I'm creating a new component.
*/

describe('Home Theater App "Add Component" page', function() {
	it('should add a new component', function() {
		browser.get('http://localhost:3000/home/#/addComponentView');

		var componentSelect = element(by.model('componentSelect'));
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
		var addComponentBtn = element(by.id('addComponent'));

		/*
			Fill entire form
		*/
		componentSelect.sendKeys('t').click(); // select Television from dropdown
		brand.sendKeys('deleteBrand');
		cost.sendKeys('9000');
		performance.sendKeys('10');
		reliability.sendKeys('1.0');
		height.sendKeys('72');
		width.sendKeys('48');
		thickness.sendKeys('6');
		weight.sendKeys('25');
		powerHandling.sendKeys('123');
		powerHandlingMin.sendKeys('5');
		powerHandlingMax.sendKeys('220');
		inputType.sendKeys('delete input');
		inputQuantity.sendKeys('1000');
		outputType.sendKeys('delete output');
		outputQuantity.sendKeys('1000');

		/*
			expect entire form to be filled
		*/
		expect(componentSelect.getAttribute('value')).toEqual('0'); // index based
		expect(brand.getAttribute('value')).toEqual('deleteBrand');
		expect(cost.getAttribute('value')).toEqual('9000');
		expect(performance.getAttribute('value')).toEqual('10');
		expect(reliability.getAttribute('value')).toEqual('1.0');
		expect(height.getAttribute('value')).toEqual('72');
		expect(width.getAttribute('value')).toEqual('48');
		expect(thickness.getAttribute('value')).toEqual('6');
		expect(weight.getAttribute('value')).toEqual('25');
		expect(powerHandling.getAttribute('value')).toEqual('123');
		expect(powerHandlingMin.getAttribute('value')).toEqual('5');
		expect(powerHandlingMax.getAttribute('value')).toEqual('220');
		expect(inputType.getAttribute('value')).toEqual('delete input');
		expect(inputQuantity.getAttribute('value')).toEqual('1000');
		expect(outputType.getAttribute('value')).toEqual('delete output');
		expect(outputQuantity.getAttribute('value')).toEqual('1000');

		/*
			Add inputs and outputs. The input and output fields should clear.
			Submit the form. All fields should clear.
		*/
		addInputBtn.click();
		addOutputBtn.click();

		expect(inputType.getAttribute('value')).toEqual('');
		expect(inputQuantity.getAttribute('value')).toEqual('');
		expect(outputType.getAttribute('value')).toEqual('');
		expect(outputQuantity.getAttribute('value')).toEqual('');

		addComponentBtn.click();

		expect(componentSelect.getAttribute('value')).toEqual('');
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
		expect(inputType.getAttribute('value')).toEqual('');
		expect(inputQuantity.getAttribute('value')).toEqual('');
		expect(outputType.getAttribute('value')).toEqual('');
		expect(outputQuantity.getAttribute('value')).toEqual('');		

	});
});