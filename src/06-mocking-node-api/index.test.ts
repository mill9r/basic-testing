// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';

jest.mock('path');

describe('doStuffByTimeout', () => {

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    function cb() {}
    const timeout = 5;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(global.setTimeout).toHaveBeenCalledWith(cb, timeout)
  });

  test('should call callback only after timeout', () => {
     const cb = jest.fn()
     const timeout = 5;
     doStuffByTimeout(cb, timeout);
     expect(cb).not.toHaveBeenCalled();
     jest.advanceTimersByTime(timeout);
     expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
     function cb() {}
    const timeout = 5;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timeout);
    expect(global.setInterval).toHaveBeenCalledWith(cb, timeout)
  });

  test('should call callback multiple times after multiple intervals', () => {
     const cb = jest.fn()
     const timeout = 5;
     doStuffByInterval(cb, timeout);
     expect(cb).not.toHaveBeenCalled();
     jest.advanceTimersByTime(12);
     expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {

    jest.spyOn(path, 'join')
    const pathToFile = 'file.txt';
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile)
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
