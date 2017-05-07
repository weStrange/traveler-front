'use strict'
/* @flow */
/* eslint-disable no-unused-vars */

import React from 'react'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Grid } from 'react-bootstrap'

import PersonalCard from './PersonalCard'
import EmptyCard from './EmptyCard'
import ItsAMatchOverlay from './ItsAMatchOverlay'
import { CardButtons } from './CardButtons'

import * as actionCreators from '../action-creators'

import type { AppState } from '../../types'
import type {
  PersonalCard as PersonalCardType,
  GroupCard as GroupCardType
} from '../types'

const style = {
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    alignSelf: 'flex-end'
  }
}

type CardWrapper = {
  type: 'PERSONAL_CARD' | 'GROUP_CARD',
  card: PersonalCardType | GroupCardType
}

type CardQueueProps = {
  profilePhoto: number,
  current: number,
  match: boolean,
  queue: List<CardWrapper>,
  ownCards: List<PersonalCardType | GroupCardType>,
  ownCard: PersonalCardType | GroupCardType,
  locationName: string,
  emptyCallback: any,
  actions: any
}

type CardQueueState = {
}

export class CardQueue extends React.PureComponent {
  state: CardQueueState;
  props: CardQueueProps;

  constructor (props: CardQueueProps) {
    super(props)
    this.state = { current: 0 }

    const { actions, ownCard } = props

    actions.personalCard.load(ownCard.lat, ownCard.lon)
    actions.groupCard.load(ownCard.lat, ownCard.lon)
    actions.personalCard.loadOwn() // TODO: own card is unnecessary and wrongly fetched here
    // This needs to be removed
      .then((cs) => actions.currentCard.selectOwn(cs.first()))
  }

  componentWillUnmount () {
    this.props.actions.common.stop()
  }

  onButtonTap = (e: any, button: string) => {
    const {
      actions,
      current,
      queue
    } = this.props

    actions.like.evaluate(
      button === 'fav',
      queue.get(current).card
    )
  }

  makeCard () {
    let currCard = this.props
      .queue
      .get(this.props.current)
      .card
    let currType = this.props
      .queue
      .get(this.props.current)
      .type

    const {
      locationName,
      queue,
      current,
      match,
      profilePhoto,
      actions
    } = this.props

    if (currType === 'PERSONAL_CARD') { // @Fixme: should replace with variable constants for easier debugging
      // code to produce personal card
      return (
        <Grid>
          <div style={style.root}>
            <PersonalCard
              username={currCard.owner.username}
              userImage={currCard.owner.photos.first()}
              cardTitle={currCard.title}
              tripStart={currCard.startTime}
              tripEnd={currCard.endTime}
              location={{ lat: currCard.lat, lon: currCard.lon }}
              images={currCard.photos}
              cardText={currCard.description}
              locationName={locationName}
            />
            <CardButtons style={style.buttons} onTouchTap={this.onButtonTap} />
            <ItsAMatchOverlay
              open={match}
              onContinue={() => actions.currentCard.nextTarget()}
              targetUserName={currCard.owner.username}
              targetFirstName={currCard.owner.firstName}
              targetLastName={currCard.owner.lastName}
              avatarImgOwn={profilePhoto}
              avatarImgTarget={currCard.owner.photos.first()} />
          </div>
        </Grid>
      )
    }
    if (currType === 'GROUP_CARD') { // @Fixme: also fix me pls
      // code to produce group card
      // waiting for group card to be implemented
      return (<label>This is an unimplemented group card. Go away!!!</label>)
    }
  }
  emptyNotifier () {
    return <h1>There is no one around</h1>
  }
  render () {
    const {
      queue,
      current
    } = this.props
    return (
      current < queue.size
      ? this.makeCard()
      : (
        <EmptyCard callback={e => this.props.emptyCallback(e)} />
      )
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    profilePhoto: state.profile.profile.photos.first(),
    current: state.cardQueue.currentCard.targetIndex,
    match: state.cardQueue.currentCard.match,
    queue: combineQueues(
      state.map.location.lat,
      state.map.location.lat,
      state.cardQueue.personalCards.cards,
      state.cardQueue.groupCards.cards
    ),
    ownCards: state.cardQueue.personalCards.ownCards
      .concat(state.cardQueue.groupCards.ownCards),
    ownCard: state.map.cardModal.card,
    locationName: state.cardQueue.currentCard.locationName
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      like: bindActionCreators({
        ...actionCreators.likeActions
      }, dispatch),
      currentCard: bindActionCreators({
        ...actionCreators.currentCardActions
      }, dispatch),
      common: bindActionCreators({
        ...actionCreators.commonActions
      }, dispatch),
      personalCard: bindActionCreators({
        ...actionCreators.personalCardLoadActions
      }, dispatch),
      groupCard: bindActionCreators({
        ...actionCreators.groupCardLoadActions
      }, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardQueue)

function combineQueues (
  currLat: number,
  currLon: number,
  personals: List<PersonalCardType>,
  groups: List<GroupCardType>
): List<CardWrapper> {
  return personals.concat(groups)
    .toSeq()
    .sortBy((p) => Math.sqrt(
      Math.pow(currLat - p.lat, 2) +
      Math.pow(currLon - p.lon, 2)
    ))
    .map((p) => ({
      type: p.participants === undefined
      ? 'PERSONAL_CARD'
      : 'GROUP_CARD',
      card: p
    }))
    .toList()
}
