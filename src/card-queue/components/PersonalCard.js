/* @flow */
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
    width: '80%',
    height: '70%',
    margin: 'auto'
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listHeader: {
    fontWeight: '400',
    textTransform: 'capitalize'
  },
  listItem: {
    textOverflow: 'ellipsis',
    display: 'flex',
    justifyContent: 'space-between'
  },
  info: {
    marginLeft: '24px'
  },
  summary: {
    marginBottom: '12px',
    textAlign: 'center',
    fontSize: '16px'
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
  <Card style={style.card}>
    <CardHeader
      avatar={generateAvatar(username)}
      title={cardTitle}
      subtitle={username}
    />
    <CardMedia>
      <img src={imageUrl} alt='Image' />
    </CardMedia>
    <CardText>
      <div style={style.cardText}>
        <span style={style.summary}>{cardText}</span>
        <TripInfo color={muiTheme.palette.primary1Color} tripInfo={tripInfo} />
      </div>
    </CardText>
  </Card>
  )
export default muiThemeable()(PersonalCard)
