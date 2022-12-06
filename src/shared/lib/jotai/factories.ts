import { SetStateAction, WritableAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'
import { Router } from 'next/router'

export type StorageType = 'hash' | 'query'

export interface FilterAtomParams {
  name: string
  initialValue: unknown
}

export interface AtomWithHashOptions<Value> {
  storageType?: StorageType
  serialize?: (val: Value) => string
  deserialize?: (str: string | null) => Value
  delayInit?: boolean
  replaceState?: boolean
  subscribe?: (callback: () => void) => () => void
}

export const atomWithUrlLocation = <Value>(key: string, initialValue: Value, options: AtomWithHashOptions<Value>) => {
  const getURLParams = () =>
    options?.storageType === 'query'
      ? new URLSearchParams(location.search.slice(1))
      : new URLSearchParams(location.hash.slice(1))

  const urlMark = options?.storageType === 'query' ? '?' : '#'

  const serialize = options?.serialize || JSON.stringify
  const deserialize = options?.deserialize || JSON.parse

  function updateQuery(key: string): void
  function updateQuery(key: string, newValue?: Value): void {
    const searchParams = getURLParams()
    newValue ? searchParams.set(key, serialize(newValue)) : searchParams.delete(key)

    const url = urlMark + searchParams.toString()

    if (options?.replaceState) {
      history.replaceState(null, '', url)
    } else {
      history.pushState(null, '', url)
    }
  }

  const subscribe =
    options?.subscribe ||
    (callback => {
      window.addEventListener('popstate', callback)
      return () => {
        window.removeEventListener('popstate', callback)
      }
    })

  const queryStorage = {
    getItem: (key: string) => {
      const searchParams = getURLParams()
      const storedValue = searchParams.get(key)

      if (storedValue === null) {
        throw new Error('no value stored')
      }

      return deserialize(storedValue)
    },
    setItem: updateQuery,
    removeItem: updateQuery,
    subscribe: (key: string, setValue: (value: Value) => void) => {
      const callback = () => {
        const searchParams = getURLParams()
        const parameter = searchParams.get(key)

        if (parameter !== null) {
          setValue(deserialize(parameter))
        } else {
          setValue(initialValue)
        }
      }

      return subscribe(callback)
    },
    ...(options?.delayInit && { delayInit: true }),
  }

  return atomWithStorage(key, initialValue, queryStorage)
}

export const atomWithStorageFactory = <Value>(
  key: string,
  initialValue: Value,
  options?: AtomWithHashOptions<Value>
): WritableAtom<Value, SetStateAction<Value> | typeof RESET> => {
  const eventName = options?.storageType === 'query' ? 'popstate' : 'hashchange'

  return atomWithUrlLocation(
    key,
    initialValue,
    Object.assign(
      {
        delayInit: false,
        subscribe: callback => {
          Router.events.on('routeChangeComplete', callback)
          window.addEventListener(eventName, callback)
          return () => {
            Router.events.off('routeChangeComplete', callback)
            window.removeEventListener(eventName, callback)
          }
        },
      } as AtomWithHashOptions<Value>,
      options
    )
  )
}

export const filterAtomsFactory = <Filters extends Record<string, Filters[keyof Filters]>>(
  filters: Filters,
  options?: AtomWithHashOptions<Filters[keyof Filters]>
) =>
  Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, atomWithStorageFactory(key, value, options)])
  ) as {
    [key in keyof Filters]: WritableAtom<Filters[key], SetStateAction<Filters[key]> | typeof RESET>
  }
