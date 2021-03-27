/* eslint-disable */
import { AspidaClient, dataToURLString } from 'aspida'
import { Methods as Methods0 } from './v1/about'
import { Methods as Methods1 } from './v1/posts'
import { Methods as Methods2 } from './v1/posts/_id@string'
import { Methods as Methods3 } from './v1/sitedata'
import { Methods as Methods4 } from './v1/tags'
import { Methods as Methods5 } from './v1/tags/_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/v1/about'
  const PATH1 = '/v1/posts'
  const PATH2 = '/v1/sitedata'
  const PATH3 = '/v1/tags'
  const GET = 'GET'

  return {
    v1: {
      about: {
        get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
          fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      posts: {
        _id: (val2: string) => {
          const prefix2 = `${PATH1}/${val2}`

          return {
            get: (option?: { query?: Methods2['get']['query'], config?: T }) =>
              fetch<Methods2['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { query?: Methods2['get']['query'], config?: T }) =>
              fetch<Methods2['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { query?: Methods1['get']['query'], config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
          `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      sitedata: {
        get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
          fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option).json(),
        $get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
          fetch<Methods3['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
          `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      tags: {
        _id: (val2: string) => {
          const prefix2 = `${PATH3}/${val2}`

          return {
            get: (option?: { query?: Methods5['get']['query'], config?: T }) =>
              fetch<Methods5['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { query?: Methods5['get']['query'], config?: T }) =>
              fetch<Methods5['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        get: (option?: { query?: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody']>(prefix, PATH3, GET, option).json(),
        $get: (option?: { query?: Methods4['get']['query'], config?: T }) =>
          fetch<Methods4['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods4['get']['query'] }) =>
          `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
