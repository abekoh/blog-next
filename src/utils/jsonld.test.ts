import { generateJsonld } from './jsonld';

describe('generateJsonld JSON-LDタグの要素生成', () => {
  test('正しく生成される', async () => {
    const actual = await generateJsonld([
      {
        type: 'Article',
        headline: 'タイトル',
        datePublished: new Date(),
        dateModified: new Date(),
      },
    ]);
    expect(actual).not.toEqual('');
  });
});
