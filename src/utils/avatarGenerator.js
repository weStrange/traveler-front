/* @flow */
import React from 'react'
import Avatar from 'material-ui/Avatar'

export const generateAvatar = (name: string) => {
  return <Avatar
    size={40}
          >
    {name[0]}
  </Avatar>
}
