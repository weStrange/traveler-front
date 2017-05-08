/* @flow */
'use strict'

import type { Action } from '../../actions'

export function stop (): Action {
  return {
    type: 'messaging-stop'
  }
}
