/* @flow */
'use strict'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
// import AutoComplete from 'material-ui/AutoComplete'

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

type MapViewProps = {
  markers: List<Marker>,
  places: List<string>,
  search: string,
  actions: any
}

export class MapView extends Component {
  props: MapViewProps;

  render () {
    const {
      markers
      // places,
      // search,
      // actions
    } = this.props

    return (
      <Grid>
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
    search: state.map.search
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
