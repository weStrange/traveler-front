/* @flow */
/* eslint-disable no-unused-vars */
'use strict'

import { List } from 'immutable'
import React from 'react'
import moment from 'moment'
import _map from 'lodash/map'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Card, CardHeader, CardText, CardMedia } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { List as UIList, ListItem } from 'material-ui/List'
import { generateAvatar } from '../../utils/index'
import Direction from 'material-ui/svg-icons/maps/directions'
import Calendar from 'material-ui/svg-icons/action/date-range'
import Vehicle from 'material-ui/svg-icons/maps/directions-car'
import People from 'material-ui/svg-icons/social/people'

import style from '../../style'

import type { Location } from '../../core/types'

type InfoRepresentationProps = {
  info: [string, any]
}

function InfoRepresentation ({
  info
}: InfoRepresentationProps): any {
  switch (info[0]) {
    case 'location': return (<label>Palo Alto</label>) // TODO: logic to get a place name goes here
    case 'tripStart': return (<label>{moment(info[1]).format('DD.MM.YYYY')}</label>)
    case 'tripEnd': return (<label>{moment(info[1]).format('DD.MM.YYYY')}</label>)
    default: return null
  }
}

function pretyifyKey (
  key: string
): string {
  switch (key) {
    case 'tripStart':
      return 'Start Date'

    case 'tripEnd':
      return 'End Date'

    case 'location':
      return 'Location'

    default:
      return ''
  }
}

type InfoProps = {
  info: [string, any],
  color: any
}

const Info = ({info, color}: InfoProps) => (
  <span style={{...style.info, color}} >
    <InfoRepresentation info={info} />
  </span>
)

type TripSpec = {
  tripStart: Date,
  tripEnd: Date,
  location: Location
}

type TripInfoProps = {
  tripSpec: TripSpec,
  color: any
}

class TripInfo extends React.PureComponent {
  props: TripInfoProps;

  getIcon (keyname) {
    switch (keyname) {
      case 'location': return <Direction style={style.icon} />
      case 'tripStart': return <Calendar style={style.icon} />
      case 'tripEnd': return <Calendar style={style.icon} />
      // case 'vehicle': return <Vehicle style={style.icon} /> // There is no vehicle data atm
      // case 'who': return <People style={style.icon} /> // TODO: move it to group card
      default: return null
    }
  }
  renderItem () { // lmao what am i doing with my life?
    return _map(this.props.tripSpec, (value, key) => {
      return (
        <div key={key}>
          {(key !== 'location') && <Divider inset />}
          <ListItem leftIcon={this.getIcon(key)} disabled style={style.listItem}>
            <span style={style.listHeader}>
              {pretyifyKey(key)}
            </span>
            <Info color={this.props.color} info={[key, value]} />
          </ListItem>
        </div>
      )
    })
  }
  render () {
    return (
      <UIList>
        {this.renderItem()}
      </UIList>
    )
  }
}

type PersonalCardProps = {
  username: string,
  userImage?: number,
  cardTitle: string,
  tripStart: Date,
  tripEnd: Date,
  location: Location,
  images: List<number>,
  cardText: string,
  primary1Color: any,
  muiTheme: any
}

const PersonalCard = ({
  username,
  userImage,
  cardTitle,
  tripStart,
  tripEnd,
  location,
  images,
  cardText,
  primary1Color,
  muiTheme
}: PersonalCardProps) => (
  <Card style={style.card} zDepth={4} >
    <CardHeader
      avatar={generateAvatar(
        username,
        userImage !== undefined
        ? '/api/images/' + (userImage)
        : ''
      )}
      title={cardTitle}
      subtitle={username}
    />
    <CardMedia style={style.cardImg}>
      <img src={'/api/images/' + (images.first())} alt='Image' />
    </CardMedia>
    <CardText>
      <div style={style.cardText}>
        <div style={style.summary}>{cardText}</div>
        <TripInfo
          color={muiTheme.palette.primary1Color}
          tripSpec={{
            tripStart,
            tripEnd,
            location
          }} />
      </div>
    </CardText>
  </Card>
  )
export default muiThemeable()(PersonalCard)
