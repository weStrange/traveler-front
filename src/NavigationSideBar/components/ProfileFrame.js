import React, { Component } from 'react'
import img from '../../../img/bg2.jpg'
import stockAvatar from '../../../img/stockavatar.jpg'
import { darkWhite, lightWhite } from 'material-ui/styles/colors'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import './animation.css'

const style = {
  profileFrame: {
    top: '0px',
    height: '250px',
    overflow: 'hidden',
    position: 'relative',
    backgroundSize: `cover`,
    backgroundBlendMode: 'multiply',
    backgroundPositionY: '50%'
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  usercard: {
    position: 'relative',
    bottom: '8px',
    color: darkWhite,
    width: '100%'
  },
  avatar: {
    marginLeft: '16px',
    marginBottom: '8px'
  },
  secondaryText: {
    color: lightWhite
  },
  iconbutton: {
    position: 'absolute',
    right: '12px',
    bottom: '16px',
    borderRadius: '50%'
  },
  hoveredStyle: {
    backgroundColor: `rgba(255,255,255,0.2)`
  }
}
export default class ProfileFrame extends Component {
  render () {
    const { rootStyle, avatarStyle, listStyle, secondaryTextStyle, primaryTextStyle, backgroundImgUrl, avatarImgUrl, primaryText, secondaryText } = this.props
    return (
      <div style={{...style.profileFrame, ...rootStyle, backgroundImage: `url('${backgroundImgUrl || img}')`}}>
        <div style={style.overlay}>
          <IconButton
            style={style.iconbutton}
            tooltip='View profile settings'
            tooltipPosition='top-left'
            hoveredStyle={style.hoveredStyle}
            touch
          >
            <SettingIcon className='rotating' color={darkWhite} />
          </IconButton>
          <Avatar style={{...style.avatar, ...avatarStyle}} size={72} src={avatarImgUrl || stockAvatar} />
          <ListItem
            style={{...style.usercard, ...listStyle}}
            primaryText={<span style={primaryTextStyle}>{primaryText || 'Username'}</span>}
            secondaryText={<p style={{...style.secondaryText, ...secondaryTextStyle}}>{secondaryText || 'Useremail@mockEmail.domainn'}</p>}
            disabled
        />
        </div>
      </div>
    )
  }
}
