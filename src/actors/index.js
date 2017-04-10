/* @flow */
'use strict'

import type { Dispatch, Store } from 'redux'

export type Actor = (state: any, dispatch: Dispatch) => void

export function lastAction<T> (
  state?: { none: true }|T = { none: true },
  action: T
): T {
  return action
}

export const bindActors = (store: Store, ...actors: Array<Actor>) => {
  let acting = false
  return () => {
    if (!acting) {
      acting = true
      let state = store.getState()
      actors.forEach((a) => a(state, store.dispatch))
      acting = false
    }
  }
}
