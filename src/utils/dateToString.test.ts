import { dateToString } from './dateToString';

describe('dateToString Date型をStringに変換する', () => {
  test('dateを"2021.01.01"という形式にする(default)', () => {
    const input = new Date('2021-01-01T01:10:10.000Z');
    const actual = dateToString(input);
    expect(actual).toEqual('2021.01.01');
  });

  test('dateを"2021-01-01"という形式にする', () => {
    const input = new Date('2021-01-01T01:10:10.000Z');
    const actual = dateToString(input, '-');
    expect(actual).toEqual('2021-01-01');
  });
});
