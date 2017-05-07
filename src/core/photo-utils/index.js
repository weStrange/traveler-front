/* @flow */
'use strict'

export function oidToUrl (
  oid: number
): string {
  return '/api/images/' + oid
}
