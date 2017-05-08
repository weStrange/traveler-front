/* @flow */
import React from 'react'
import Avatar from 'material-ui/Avatar'

export const generateAvatar = (
  name: string,
  url?: string = ''
) => {
  return url === ''
  ? (<Avatar
    size={40}
          >
    {name[0]}
  </Avatar>)
  : (<Avatar
    size={40}
    src={url} />)
}
