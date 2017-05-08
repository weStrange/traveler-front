/* @flow */
'use strict'

import React from 'react'
import Avatar from 'material-ui/Avatar'

import { connect } from 'react-redux'

import type { AppState } from '../types'
import type { Profile } from './types'

type ProfileViewProps = {
  profile: Profile
}

export function ProfileView ({
  profile
}: ProfileViewProps) {
  let avatarStyle = {
    marginRight: '45%',
    marginLeft: '45%'
  }

  return (
    <Avatar
      size={70}
      style={avatarStyle} />
  )
}

function mapStateToProps (state: AppState) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView)
