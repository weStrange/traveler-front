/* @flow */
'use strict'

import type { Action } from '../../actions'

export function edit (search: string): Action {
  return {
    type: 'map-search-edit',
    search: search
  }
}
