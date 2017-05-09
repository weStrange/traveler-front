/* @flow */
/* global google */
'use strict'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Search from 'material-ui/svg-icons/action/search'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from 'react-bootstrap'

import {
  Map,
  OwnCardView,
  CreateCardView
} from './components'

import style from '../style'

import * as actionCreators from './action-creators'

import type {
  OwnCardState,
  CardModalState
} from './types'
import type { AppState } from '../types'
import type {
  GooglePlace,
  GoogleLocation
} from '../core/types'

type MapViewProps = {
  places: List<GooglePlace>,
  location: GoogleLocation,
  zoom: number,
  search: string,
  ownCard: OwnCardState,
  cardModal: CardModalState,
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
    props.actions.location.zoom(8)
    props.actions.location.panTo({
      lat: 60,
      lng: 25
    })
  }

  componentWillUnmount () {
    this.props.actions.common.stop()
  }

  render () {
    const {
      ownCard,
      cardModal,
      places,
      zoom,
      location,
      search,
      actions
    } = this.props

    return (
      <Grid>
        <Paper style={style.searchBar} zDepth={2}>
          <MenuItem style={{cursor: 'pointer'}} disabled leftIcon={<Search />}><AutoComplete
            underlineShow={false}
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
            /></MenuItem>
        </Paper>

        <Map
          zoom={zoom}
          center={location}
          onZoomChange={() => actions.location.zoom(
            this.state.mapRef
            ? this.state.mapRef.getZoom()
            : zoom
          )}
          onCenterChange={() => {
            let newCenter = {
              lat: location.lat,
              lng: location.lng
            }
            if (this.state.mapRef) {
              newCenter = {
                ...newCenter,
                lat: this.state.mapRef.getCenter().lat()
              }
            }
            if (this.state.mapRef) {
              newCenter = {
                ...newCenter,
                lng: this.state.mapRef.getCenter().lng()
              }
            }

            actions.location.panTo(newCenter)
          }}
          onMapLoad={(map) => { this.state.mapRef = map }}
          onMarkerClick={(index: number) => {
            let card = ownCard.personalCards
              .concat(ownCard.groupCards)
              .get(index)

            actions.cardModal.show(card)
            actions.cardModal.loadName({
              lat: card.lat,
              lng: card.lon
            })
          }}
          markers={
            ownCard.personalCards
              .concat(ownCard.groupCards)
              .map((p) => ({
                position: {
                  lat: p.lat,
                  lng: p.lon
                }
              }))
          } />

        <OwnCardView
          card={cardModal.card}
          locationName={cardModal.locationName}
          onRequestClose={() => actions.cardModal.hide()} />

        <FloatingActionButton
          style={style.actionButton}
          onClick={() => actions.cardCreate.start()}>
          <ContentAdd />
        </FloatingActionButton>
        <CreateCardView />
      </Grid>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    search: state.map.search,
    places: state.map.place.all,
    location: {
      lat: state.map.location.lat,
      lng: state.map.location.lng
    },
    zoom: state.map.location.zoom,
    ownCard: state.map.ownCard,
    cardModal: state.map.cardModal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      cardCreate: bindActionCreators(actionCreators.cardCreateActions, dispatch),
      search: bindActionCreators(actionCreators.searchActions, dispatch),
      place: bindActionCreators(actionCreators.place, dispatch),
      location: bindActionCreators(actionCreators.location, dispatch),
      ownCard: bindActionCreators(actionCreators.ownCardsActions, dispatch),
      cardModal: bindActionCreators(actionCreators.cardModalActions, dispatch),
      common: bindActionCreators(actionCreators.commonActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
