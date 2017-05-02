/* @flow */
'use strict'
import React from 'react'
import _map from 'lodash/map'
import { Card, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import { List as UIList, ListItem } from 'material-ui/List'
import Direction from 'material-ui/svg-icons/maps/directions'
import Calendar from 'material-ui/svg-icons/action/date-range'
import { indigo500 } from 'material-ui/styles/colors'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import style from '../../style'

import * as actionCreators from '../action-creators'

import type { CardType } from '../types'
import type { AppState } from '../../types'

type InfoRepresentationProps = {
  info: [string, any],
  actions: any
}

function InfoRepresentation ({
  info,
  actions
}: InfoRepresentationProps): any {
  switch (info[0]) {
    case 'title':
      return (
        <TextField
          type='text'
          hintText=''
          value={info[1]}
          onChange={(e, value) => actions.cardCreate.editTitle(value)}
        />
      )

    case 'location':
      return (
        <TextField
          type='text'
          hintText=''
          value={info[1]}
          onChange={(e, value) => actions.cardCreate.editLocation(value)}
        />
      )

    case 'startTime':
      return (
        <DatePicker
          hintText='Start of the trip'
          mode='landscape'
          value={info[1]}
          onChange={(ev, date) => actions.cardCreate.editStartTime(date)}
        />
      )

    case 'endTime':
      return (
        <DatePicker
          hintText='End of the trip'
          mode='landscape'
          value={info[1]}
          onChange={(ev, date) => actions.cardCreate.editStartTime(date)}
        />
      )

    default:
      return null
  }
}

function pretyifyKey (
  key: string
): string {
  switch (key) {
    case 'title':
      return 'Title'

    case 'description':
      return 'Description'

    case 'type':
      return 'Card type'

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
  color: any,
  actions: any
}

const Info = ({info, color, actions}: InfoProps) => (
  <span style={{...style.info, color}} >
    <InfoRepresentation info={info} actions={actions} />
  </span>
)

type TripSpec = {
  startTime: Date,
  endTime: Date,
  location: string
}

type TripInfoProps = {
  tripSpec: TripSpec,
  color: any,
  actions: any
}

class TripInfo extends React.PureComponent {
  props: TripInfoProps;

  getIcon (keyname) {
    switch (keyname) {
      case 'title': return null // TODO: add icon
      case 'description': return null // TODO: add icon
      case 'location': return <Direction style={style.icon} />
      case 'startTime': return <Calendar style={style.icon} />
      case 'endTime': return <Calendar style={style.icon} />
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
          <ListItem
            leftIcon={this.getIcon(key)}
            disabled
            style={style.listItem}>
            <span style={style.listHeader}>
              {pretyifyKey(key)}
            </span>
            <Info
              color={this.props.color}
              info={[key, value]}
              actions={this.props.actions} />
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

type CreateCardViewProps = {
  title: string,
  description: string,
  type: CardType,
  lat: number,
  lon: number,
  startTime: Date,
  endTime: Date,
  participants?: List<string>,
  username: string,
  userImage?: number,
  actions: any
}

export function CreateCardView ({
  title,
  description,
  type,
  lat,
  lon,
  startTime,
  endTime,
  participants,
  userImage,
  username,
  actions
}: CreateCardViewProps) {
  return (
    <Card style={style.card} zDepth={4} >
      <CardText>
        <TextField
          hintText='Description'
          value={description}
          multiLine
          rows={5}
          fullWidth
          onChange={(e, value) => actions.createCard.editDescription(value)}
        />
      </CardText>
      <TripInfo
        color={indigo500}
        tripSpec={{
          title,
          startTime,
          endTime,
          location: getLocation(lat, lon)
        }}
        actions={actions} />
    </Card>
  )
}

// TODO: add google maps API support here
function getLocation (
  lat: number,
  lon: number
): string {
  return 'Palo Alto, CA, USA'
}

function mapStateToProps (state: AppState) {
  return {
    ...state.map.cardCreate
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      cardCreate: bindActionCreators({
        ...actionCreators.cardCreateActions
      }, dispatch),
      cardUpload: bindActionCreators({
        ...actionCreators.cardUploadActions
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCardView)
