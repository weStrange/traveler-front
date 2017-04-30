/* @flow */
/* eslint-disable no-unused-vars */

'use strict'
import React from 'react'
import _map from 'lodash/map'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { generateAvatar } from '../../utils/index'
import Direction from 'material-ui/svg-icons/maps/directions'
import Calendar from 'material-ui/svg-icons/action/date-range'
import Vehicle from 'material-ui/svg-icons/maps/directions-car'
import People from 'material-ui/svg-icons/social/people'

const style = {
  card: {
    width: '70%',
    margin: 'auto',
    maxWidth: '700px',
    minWidth: '500px'
  },
  cardImg: {
    maxHeight: '250px',
    overflow: 'hidden',
    margin: 'auto'
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  listHeader: {
    fontWeight: '500',
    fontSize: '18px',
    textTransform: 'uppercase'
  },
  listItem: {
    fontWeight: '300',
    lineHeight: '120%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    wordWrap: 'break-word'
  },
  info: {
    marginLeft: '6px'
  },
  summary: {
    marginLeft: '16px',
    marginRight: '12px',
    textAlign: 'left',
    fontSize: '14px',
    maxHeight: '80px',
    overflow: 'scroll'
  },
  icon: {
    width: '24px',
    height: '24px'
  }
}
const Info = ({info, color}) => (
  <span style={{...style.info, color}} >{info}</span>
)
class TripInfo extends React.PureComponent {
  getIcon (keyname) {
    switch (keyname) {
      case 'where': return <Direction style={style.icon} />
      case 'when': return <Calendar style={style.icon} />
      case 'vehicle': return <Vehicle style={style.icon} />
      case 'who': return <People style={style.icon} />
      default: return null
    }
  }
  renderItem () { // lmao what am i doing with my life?
    return _map(this.props.tripInfo, (value, key) => {
      return (
        <div>
          {(key !== 'where') && <Divider inset />}
          <ListItem leftIcon={this.getIcon(key)} disabled style={style.listItem}>
            <span style={style.listHeader}>{key}</span><Info color={this.props.color} info={value} />
          </ListItem>
        </div>
      )
    })
  }
  render () {
    return (
      <List>
        {this.renderItem()}
      </List>
    )
  }
}

const PersonalCard = ({
  username,
  cardTitle,
  cardText,
  imageUrl,
  primary1Color,
  tripInfo,
  muiTheme
}) => (
  <Card style={style.card} zDepth={4} >
    <CardHeader
      avatar={generateAvatar(username)}
      title={cardTitle}
      subtitle={username}
    />
    <CardMedia style={style.cardImg}>
      <img src={imageUrl} alt='Image' />
    </CardMedia>
    <CardText>
      <div style={style.cardText}>
        <div style={style.summary}>{cardText}</div>
        <TripInfo color={muiTheme.palette.primary1Color} tripInfo={tripInfo} />
      </div>
    </CardText>
  </Card>
  )
export default muiThemeable()(PersonalCard)
