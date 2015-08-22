describe("VanillaMasker.maskMoney", function() {

  it('throws error: "VanillaMasker: There is no element to bind." when element is undefined', function() {
    expect(function() {
      VMasker(undefined).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is null', function() {
    expect(function() {
      VMasker(null).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is blank', function() {
    expect(function() {
      VMasker("").maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('does not throw error when element is empty array', function() {
    expect(function() {
      VMasker([]).maskMoney();
    }).not.toThrow();
  });

});

describe("VanillaMasker.toMoney", function() {

  it('returns the default money', function() {
    expect(VMasker.toMoney(10000000000)).toEqual('100.000.000,00');
  });

  it('returns 1.000,00 money when number is 1a0b0c000', function() {
    expect(VMasker.toMoney('1a0b0c000')).toEqual('1.000,00');
  });

  it('returns 0,00 money when number is 0', function() {
    expect(VMasker.toMoney(0)).toEqual('0,00');
  });

  it('returns 0,01 money when number is 1', function() {
    expect(VMasker.toMoney(1)).toEqual('0,01');
  });

  it('returns 0,10 default money number is 10', function() {
    expect(VMasker.toMoney(10)).toEqual('0,10');
  });

  it('returns 199,59 money when number is 199.59 with decimal', function() {
    expect(VMasker.toMoney(199.59)).toEqual('199,59');
  });

  it('returns 199,59 money when number is a string 199.59 with decimal', function() {
    expect(VMasker.toMoney('199.59')).toEqual('199,59');
  });

  it('returns 1.000,00 money when number is a string', function() {
    expect(VMasker.toMoney('100000')).toEqual('1.000,00');
  });

  it('returns 1.000 money when precision is 0', function() {
    expect(VMasker.toMoney(1000, {precision: 0})).toEqual('1.000');
  });

  it('returns R$ 10.000,00 when unit is R$', function() {
    expect(VMasker.toMoney(10000000000, {unit: 'R$'})).toEqual('R$ 100.000.000,00');
  });

  it('returns 100,000,000,00 when delimiter is ","', function() {
    expect(VMasker.toMoney(10000000000, {delimiter: ','})).toEqual('100,000,000,00');
  });

  it('returns 100.000.000.00 when separator is "."', function() {
    expect(VMasker.toMoney(10000000000, {separator: '.'})).toEqual('100.000.000.00');
  });

  it('returns 100.000.000,00 when zeroCents is true', function() {
    expect(VMasker.toMoney(100000000, {zeroCents: true})).toEqual('100.000.000,00');
  });
});

describe("VanillaMasker.unmaskMoney", function() {

  it('unmasks the default money string', function() {
    expect(VMasker.unmaskMoney('100.000.000,00')).toEqual(100000000);
  });

  it('unmasks a shorter money string', function() {
    expect(VMasker.unmaskMoney('1.000,00')).toEqual(1000);
  });

  it('returns 0 money when money is 0,00', function() {
    expect(VMasker.unmaskMoney('0,00')).toEqual(0);
  });

  it('returns 0,01 money when number is 1', function() {
    expect(VMasker.unmaskMoney('0,01')).toEqual(0.01);
  });

  it('returns 0,10 default money number is 10', function() {
    expect(VMasker.unmaskMoney('0,10')).toEqual(0.1);
  });

  it('returns 199,59 money when number is 199.59 with decimal', function() {
    expect(VMasker.unmaskMoney('199,59')).toEqual(199.59);
  });

  it('returns 1000 money when precision is 0', function() {
    expect(VMasker.unmaskMoney('1.000', {precision: 0})).toEqual(1000);
  });

  it('returns 1000 money when precision is 3', function() {
    expect(VMasker.unmaskMoney('1.000,000', {precision: 3})).toEqual(1000);
  });

  it('returns 100000000 when unit is R$', function() {
    expect(VMasker.unmaskMoney('R$ 100.000.000,00', {unit: 'R$'})).toEqual(100000000);
  });

  it('returns a 100000000 when unit is $R and suffix is R$', function() {
    expect(VMasker.unmaskMoney('R$ 100.000.000,00 $R', {unit: 'R$', suffixUnit: "$R"})).toEqual(100000000);
  });

  it('returns R$ 10.000,00 when suffix is R$', function() {
    expect(VMasker.unmaskMoney('100.000.000,00 R$', {suffixUnit: 'R$'})).toEqual(100000000);
  });

  it('returns 100000000 when delimiter is ","', function() {
    expect(VMasker.unmaskMoney('100,000,000,00', {delimiter: ','})).toEqual(100000000);
  });

  it('returns 100000000 when delimiter is "," and separator is "."', function() {
    expect(VMasker.unmaskMoney('100,000,000.00', {delimiter: ',' , separator: '.'})).toEqual(100000000);
  });

  it('returns 100000000 when separator is "."', function() {
    expect(VMasker.unmaskMoney('100.000.000.00', {separator: '.'})).toEqual(100000000);
  });

  it('returns 100000000 when zeroCents is true', function() {
    expect(VMasker.unmaskMoney('100.000.000,00', {zeroCents: true})).toEqual(100000000);
  });
});

describe('VanillaMasker.numbersFromMaskedMoney', function() {
  it('can convert 0.12 to the keystrokes "12"', function() {
    expect(VMasker.numbersFromMaskedMoney('0.12')).toEqual('12');
  });

  it('can convert the number 0.03 to the keystrokes "12"', function() {
    expect(VMasker.numbersFromMaskedMoney(0.03)).toEqual('3');
  });

  it('can convert 0.00 to an empty string', function() {
    expect(VMasker.numbersFromMaskedMoney('0.00')).toEqual('');
  });

  it('can convert 0 to an empty string', function() {
    expect(VMasker.numbersFromMaskedMoney('0')).toEqual('');
  });

  it('can convert 120.00 to the keystrokes "12000"', function() {
    expect(VMasker.numbersFromMaskedMoney('120.00')).toEqual('12000');
  });

  it('can convert 120 to the keystrokes "12000"', function() {
    expect(VMasker.numbersFromMaskedMoney('120')).toEqual('120');
  });

  it('can truncate if precision is insufficient', function() {
    expect(VMasker.numbersFromMaskedMoney('123.45678')).toEqual('12345678');
  });

  it('can work with a prefix unit', function() {
    expect(VMasker.numbersFromMaskedMoney('$ 123.45678', {unit: '$'})).toEqual('12345678');
  });
});
