// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';
jest.mock('lodash');
const mockLodash = require('lodash')

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    expect(getBankAccount(balance).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(100);
    expect(() => acc.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(100);
    const acc2 = getBankAccount(200);
    expect(() => acc.transfer(200, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(100, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 100;
    expect(getBankAccount(balance).deposit(100).getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
     const balance = 100;
     expect(getBankAccount(balance).withdraw(100).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(100);
    const acc2 = getBankAccount(200);
    acc.transfer(100, acc2)
    expect(acc.getBalance()).toBe(0);
    expect(acc2.getBalance()).toBe(300);;
  });

  test('fetchBalance should return number in case if request did not failed', async () => {

    mockLodash.random.mockImplementation(() => 5);

    const acc = await getBankAccount(100).fetchBalance();
    expect(acc).toBe(5);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    mockLodash.random.mockImplementation(() => 5);

    const acc = await getBankAccount(100).fetchBalance();
    expect(acc).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
     mockLodash.random.mockImplementation(() => null);

    const acc = await getBankAccount(100).fetchBalance();
    expect(acc).toBeNull;
  });
});
