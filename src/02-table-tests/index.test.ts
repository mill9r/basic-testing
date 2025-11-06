// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: null, expected: null },
]; 

describe.each(testCases)('calculator($a, $b, $action)', (payload) => {
   test(`returns ${payload.expected}`, () => {
    expect(simpleCalculator(payload)).toBe(payload.expected);
  });
})
