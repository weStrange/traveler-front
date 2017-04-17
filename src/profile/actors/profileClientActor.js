/* @flow */
'use strict'

import type { AppState, Dispatch } from '../../types'

export default function archiveClientActor (client: any) {
  return (state: AppState, dispatch: Dispatch) => {
    if (state.lastAction.none) {
      return
    }

    let action = state.lastAction

    switch (action.type) {
      case 'profile-load-request':
        loadProfile(client, dispatch)
        break

      case 'profile-update-request':
        updateProfile(client, dispatch)
        break

      default:
        break
    }
  }
}

function loadProfile (
  client: any,
  dispatch: Dispatch
) {
  // TODO: interaction with core/client.js here
}

function updateProfile (
  cleint: any,
  dispatch: Dispatch
) {
  // TODO: interaction with core/client.js here
}
