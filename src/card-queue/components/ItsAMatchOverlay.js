/* @flow */

import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import '../../animate.css'
import stockAvatar from '../../../img/stockavatar.jpg'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import MessageIcon from 'material-ui/svg-icons/communication/chat'

const style = {
  filter: {
    textAlign: 'center',
    width: '80%',
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: {
    fontFamily: 'Pacifico, cursive',
    fontSize: '4em',
    fontWeight: '200',
    margin: '0 auto'
  },
  secondaryText: {
    margin: '0',
    fontWeight: '400'
  },
  avatar: {
    margin: '36px 48px'
  },
  button: {
    margin: '12px 0',
    animationDelay: '4s'
  },
  transparentOverlay: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  innerButton: {
    height: '56px'
  },
  buttonGroup: {
    height: '25%',
    margin: '0 15%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontWeight: 400
  },
  flatButton: {
    border: `2px solid`
  }
}

type ItsAMatchOverlayProps = {
  open: boolean,
  avatarImgUrl2?: string,
  avatarImgUrl1?: string,
  muiTheme: any,
  targetName?: string
}
class ItsAMatchOverlay extends Component {
  props: ItsAMatchOverlayProps;
  render () {
    const {avatarImgUrl1, avatarImgUrl2, open} = this.props
    const { palette } = this.props.muiTheme
    return (
      <Dialog open={open} contentStyle={style.filter}>
        <h3 style={{...style.primaryText, color: palette.primary2Color}}>It's a match!</h3>
        <h4 style={style.secondaryText}>You and {this.props.targetName || 'someone'} have liked each other's trip!</h4>
        <div>
          <Avatar className='animated ease slideInLeft' style={style.avatar} size={128} src={avatarImgUrl1 || stockAvatar} />
          <Avatar className='animated ease slideInRight' style={style.avatar} size={128} src={avatarImgUrl2 || stockAvatar} />
        </div>
        <div style={style.buttonGroup}>
          <RaisedButton
            icon={<MessageIcon />}
            overlayStyle={style.transparentOverlay}
            className='animated infinite pulse'
            style={style.button}
            backgroundColor={palette.primary1Color}
            buttonStyle={style.innerButton}
            label={<span style={style.buttonText}>Send a message</span>}
          />
          <FlatButton
            style={{...style.button, ...style.flatButton, ...style.innerButton, color: palette.primary1Color}}
            label={<span style={style.buttonText}>Continue browsing</span>}
          />
        </div>
      </Dialog>
    )
  }
}

export default muiThemeable()(ItsAMatchOverlay)
