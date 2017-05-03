/* @flow */
'use strict'
import React from 'react'
import _map from 'lodash/map'
import { Card, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import Autocomplete from 'material-ui/AutoComplete'
import { List as UIList, ListItem } from 'material-ui/List'
import Direction from 'material-ui/svg-icons/maps/directions'
import Calendar from 'material-ui/svg-icons/action/date-range'
import TextFormat from 'material-ui/svg-icons/content/text-format'
import { indigo500 } from 'material-ui/styles/colors'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import style from '../../style'

import * as actionCreators from '../action-creators'

import type { CardType } from '../types'
import type { AppState } from '../../types'
import type { GooglePlace } from '../../core/types'

type InfoRepresentationProps = {
  info: [string, any],
  locationOptions: List<GooglePlace>,
  actions: any
}

function InfoRepresentation ({
  info,
  locationOptions,
  actions
}: InfoRepresentationProps): any {
  switch (info[0]) {
    case 'title':
      return (
        <TextField
          type='text'
          hintText=''
          value={info[1]}
          fullWidth
          onChange={(e, value) => actions.cardCreate.editTitle(value)}
        />
      )

    case 'location':
      return (
        <Autocomplete
          type='text'
          hintText=''
          value={info[1]}
          fullWidth
          dataSource={locationOptions.map((p) => p.description).toArray()}
          onUpdateInput={(value) => {
            actions.cardCreate.editLocationName(value)
            actions.locationOptions.fetch(value)
          }}
          onNewRequest={(value, index) => {
            actions.cardCreate.selectPlace(locationOptions.get(index).place_id)
          }}
        />
      )

    case 'startTime':
      return (
        <DatePicker
          hintText='Start of the trip'
          mode='landscape'
          value={info[1]}
          fullWidth
          onChange={(ev, date) => actions.cardCreate.editStartTime(date)}
        />
      )

    case 'endTime':
      return (
        <DatePicker
          hintText='End of the trip'
          mode='landscape'
          value={info[1]}
          fullWidth
          onChange={(ev, date) => actions.cardCreate.editEndTime(date)}
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

    case 'startTime':
      return 'Start Date'

    case 'endTime':
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
  locationOptions: List<GooglePlace>,
  actions: any
}

const Info = ({
  info,
  color,
  locationOptions,
  actions
}: InfoProps) => (
  <span
    style={{
      ...style.info,
      color,
      width: '70%'
    }} >
    <InfoRepresentation
      info={info}
      actions={actions}
      locationOptions={locationOptions} />
  </span>
)

type TripSpec = {
  startTime: Date,
  endTime: Date,
  location: string
}

type TripInfoProps = {
  tripSpec: TripSpec,
  locationOptions: List<GooglePlace>,
  color: any,
  actions: any
}

class TripInfo extends React.PureComponent {
  props: TripInfoProps;

  getIcon (keyname) {
    switch (keyname) {
      case 'title': return <TextFormat style={style.icon} />
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
              locationOptions={this.props.locationOptions}
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
  locationOptions: List<GooglePlace>,
  locationName: string,
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
  locationOptions,
  locationName,
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
          onChange={(e, value) => actions.cardCreate.editDescription(value)}
        />
      </CardText>
      <TripInfo
        color={indigo500}
        tripSpec={{
          title,
          startTime,
          endTime,
          location: locationName
        }}
        locationOptions={locationOptions}
        actions={actions} />
      <CardActions>
        <Link to='/map'>
          <FlatButton
            label='Create'
            primary
            disabled={title === '' || (
              lat === 0 &&
              lon === 0
            )}
            onClick={(ev) => actions.cardUpload.upload('personal', {
              title,
              description,
              startTime,
              endTime,
              lat,
              lon
            })}
           />
        </Link>
      </CardActions>
    </Card>
  )
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
      }, dispatch),
      locationOptions: bindActionCreators({
        ...actionCreators.locationOptions
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCardView)
