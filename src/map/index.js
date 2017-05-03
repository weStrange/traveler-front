/* @flow */
'use strict'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'

import React, { Component } from 'react'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Grid } from 'react-bootstrap'

import { Map } from './components'

import style from '../style'

import * as actionCreators from './action-creators'

import type { Marker } from './types'
import type { AppState } from '../types'
import type { GooglePlace } from '../core/types'

type MapViewProps = {
  markers: List<Marker>,
  places: List<GooglePlace>,
  search: string,
  actions: any
}

export class MapView extends Component {
  props: MapViewProps;

  render () {
    const {
      markers,
      places,
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
            onNewRequest={(value, index) => actions.search}
            fullWidth
          />
        </Paper>

        <Map
          markers={markers} />

        <FloatingActionButton style={style.actionButton}>
          <ContentAdd />
        </FloatingActionButton>
      </Grid>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    markers: state.cardQueue.personalCards.ownCards
      .concat(state.cardQueue.groupCards.ownCards)
      .map((p) => ({
        position: {
          lat: p.lat,
          lng: p.lon
        }
      })),
    search: state.map.search,
    places: state.map.place.all
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      cardCreate: bindActionCreators(actionCreators.cardCreateActions, dispatch),
      search: bindActionCreators(actionCreators.searchActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
