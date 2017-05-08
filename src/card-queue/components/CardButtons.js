'use strict'
/* @flow */
/* eslint-disable no-unused-vars */

import React from 'react'
import FloatingButton from 'material-ui/FloatingActionButton'
import Favorite from 'material-ui/svg-icons/action/favorite'
import Disfavorite from 'material-ui/svg-icons/navigation/close'
import { red500, indigo500 } from 'material-ui/styles/colors'
const styles = {
  root: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'space-around',
    width: '70%',
    minWidth: '500px'
  },
  button: {
    transform: `scale(1.5)`
  }
}
export const FavoriteButton = ({ callback } :
 { callback: (e: any, str: string) => void }) => (
   <FloatingButton onTouchTap={(e) => callback(e, 'fav')} style={styles.button} backgroundColor={red500}><Favorite /></FloatingButton>
)
export const DisfavoriteButton = ({ callback } :
 { callback: (e: any, str: string) => void }) => (
   <FloatingButton onTouchTap={e => callback(e, 'disfav')} style={styles.button} backgroundColor={indigo500}><Disfavorite /></FloatingButton>
)
export const CardButtons = ({ onTouchTap, style } :
{ onTouchTap: (e: any, str: string) => void, style: any }) => (
  <div style={{ ...styles.root, ...style }} >
    <FavoriteButton callback={onTouchTap} />
    <DisfavoriteButton callback={onTouchTap} />
  </div>
)
