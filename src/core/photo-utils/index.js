/* @flow */
'use strict'

export function oidToUrl (
  oid: number
): string | null {
  return oid === undefined
  ? null
  : '/api/images/' + oid
}
