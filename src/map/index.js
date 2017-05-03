/* @flow */
/* global google */
'use strict'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'

import React, { Component } from 'react'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Grid } from 'react-bootstrap'

import { Map } from './components'

import style from '../style'

import * as actionCreators from './action-creators'

import type { Marker, OwnCardState } from './types'
import type { AppState } from '../types'
import type { GooglePlace, GoogleLocation } from '../core/types'

type MapViewProps = {
  markers: List<Marker>,
  places: List<GooglePlace>,
  location: GoogleLocation,
  zoom: number,
  search: string,
  ownCard: OwnCardState,
  actions: any
}

type MapViewState = {
  mapRef: any | null
}

export class MapView extends Component {
  props: MapViewProps;
  state: MapViewState;

  constructor (props: MapViewProps) {
    super(props)

    this.state = { mapRef: null }

    props.actions.ownCard.fetchPersonal()
    props.actions.ownCard.fetchGroup()
  }

  render () {
    const {
      markers,
      places,
      zoom,
      location,
      search,
      actions
    } = this.props

    return (
      <Grid>
        <Paper style={style.searchBar} zDepth={4}>
          <AutoComplete
            hintText='Search'
            value={search}
            dataSource={places.map((p) => p.description).toArray()}
            onUpdateInput={(value) => actions.search.edit(value)}
            onNewRequest={(value, index) => {
              actions.place
                .select(places.get(index).place_id)
                .then((p) => {
                  actions.location.panTo({
                    lat: p.place.geometry.location.lat(),
                    lng: p.place.geometry.location.lng()
                  })
                  actions.location.zoom(10)
                  if (this.state.mapRef !== null) {
                    this.state.mapRef.fitBounds(
                      // $FlowIgnore
                      new google.maps.LatLngBounds(
                        {
                          lat: p.place.geometry.viewport.f.b,
                          lng: p.place.geometry.viewport.b.b
                        },
                        {
                          lat: p.place.geometry.viewport.f.f,
                          lng: p.place.geometry.viewport.b.f
                        }
                      )
                    )
                  }
                })
            }}
            fullWidth
          />
        </Paper>

        <Map
          zoom={zoom}
          center={location}
          onMapLoad={(map) => { this.state.mapRef = map }}
          markers={markers} />

        <Link to='/create-card'>
          <FloatingActionButton style={style.actionButton}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </Grid>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    markers: state.map.ownCard.personalCards
      .concat(state.map.ownCard.groupCards)
      .map((p) => ({
        position: {
          lat: p.lat,
          lng: p.lon
        }
      })),
    search: state.map.search,
    places: state.map.place.all,
    location: {
      lat: state.map.location.lat,
      lng: state.map.location.lng
    },
    zoom: state.map.location.zoom,
    ownCard: state.map.ownCard
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      cardCreate: bindActionCreators(actionCreators.cardCreateActions, dispatch),
      search: bindActionCreators(actionCreators.searchActions, dispatch),
      place: bindActionCreators(actionCreators.place, dispatch),
      location: bindActionCreators(actionCreators.location, dispatch),
      ownCard: bindActionCreators(actionCreators.ownCardsActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
