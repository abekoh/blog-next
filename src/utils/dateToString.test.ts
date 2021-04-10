import { dateToString } from './dateToString';

describe('dateToString Date型をStringに変換する', () => {
  test('ISO-8601を"2021/01/01(Fri) 10:10"という形式にする', () => {
    const input = new Date('2021-01-01T01:10:10.000Z');
    const actual = dateToString(input);
    expect(actual).toEqual('2021.01.01');
  });
});
