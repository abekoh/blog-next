import { JsonLdObj } from 'jsonld/jsonld-spec';

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
    expect((actual as JsonLdObj)['@context']).toEqual('https://schema.org');
  });
});
