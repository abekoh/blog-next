import createCache from '@emotion/cache';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function createEmotionCache() {
  return createCache({ key: 'css' });
}
