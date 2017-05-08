/* @flow */
'use strict'

import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { hashHistory } from 'react-router'

import { PersonalCard } from '../../card-queue/components'

import type {
  PersonalCard as PersonalCardType,
  GroupCard
} from '../../core/types'

type OwnCardViewProps = {
  card: PersonalCardType | GroupCard | null,
  locationName: string,
  onRequestClose?: () => void,
  onMatchStart?: () => void
}

export default function OwnCardView ({
  card,
  locationName,
  onRequestClose = () => {},
  onMatchStart = () => {}
}: OwnCardViewProps) {
  const buttons = [
    <FlatButton
      label='Ok'
      primary
      onTouchTap={onRequestClose}
    />,
    <FlatButton
      label='Match'
      primary
      onTouchTap={() => {
        onMatchStart()
        onRequestClose()
        hashHistory.push('/card-queue')
      }}
    />
  ]

  return card === null
  ? null
  : (
    <div>
      <Dialog
        title={card.title}
        actions={buttons}
        modal={false}
        open
        autoScrollBodyContent
        bodyStyle={{
          padding: 0
        }}
        onRequestClose={onRequestClose}
      >
        <PersonalCard
          styles={{
            margin: 0,
            padding: 0,
            width: '100%',
            maxWidth: '100%'
          }}
          username={card.owner.username}
          userImage={card.owner.photos.first()}
          cardTitle={card.title}
          tripStart={card.startTime}
          tripEnd={card.endTime}
          location={{ lat: card.lat, lon: card.lon }}
          images={card.photos}
          cardText={card.description}
          locationName={locationName} />
      </Dialog>
    </div>
  )
}
