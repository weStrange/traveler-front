/* @flow */
/* eslint-disable no-unused-vars */

import React from 'react'
import PersonalCard from './PersonalCard'
import { CardButtons } from './CardButtons'
import EmptyCard from './EmptyCard'

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
type CardQueueProps = {
  queue: Array<any>,
  mode: string,
  onButtonTap: any,
  emptyCallback: any,
};
type CardQueueState = {
  current: number
};
export default class CardQueue extends React.PureComponent {
  state: CardQueueState;
  constructor (props: CardQueueProps) {
    super(props)
    this.state = { current: 0 }
  }
  onButtonTap = (e: any, button: string) => {
    const { current } = this.state
    this.setState((state, props) => { return state.current++ })
  }
  makeCard (mode: string) {
    if (mode === 'PERSONAL_CARD') { // @Fixme: should replace with variable constants for easier debugging
      // code to produce personal card
      const { current } = this.state
      const { queue } = this.props
      const cardProps = queue[current]
      return (
        <div style={style.root}>
          <PersonalCard
            username={cardProps.username}
            cardTitle={cardProps.cardTitle}
            tripInfo={cardProps.tripInfo}
            imageUrl={cardProps.imageUrl}
            cardText={cardProps.cardText}
          />
          <CardButtons style={style.buttons} onTouchTap={this.onButtonTap} />
        </div>
      )
    }
    if (mode === 'GROUP_CARD') { // @Fixme: also fix me pls
      // code to produce group card
      // waiting for group card to be implemented
    }
  }
  emptyNotifier () {
    return <h1>There is no one around</h1>
  }
  render () {
    const { current } = this.state
    const { queue } = this.props
    return (current < queue.length) ? this.makeCard(this.props.mode) : (<EmptyCard callback={e => this.props.emptyCallback(e)} />)
  }
}
