/* @flow */
'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Card, CardHeader, CardText, CardMedia, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { generateAvatar } from '../../utils/index'
import Direction from 'material-ui/svg-icons/maps/directions'
import Calendar from 'material-ui/svg-icons/action/date-range'
import Vehicle from 'material-ui/svg-icons/maps/directions-car'
import People from 'material-ui/svg-icons/social/people'

const style ={
  card: {
    width : '80%',
    height: '70%',
    margin: 'auto'
  },
  cardText: {
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
  },
  listHeader: {
    fontWeight   : '400',
    textTransform: 'capitalize'
  },
  listItem: {
    textOverflow  : 'ellipsis',
    display       : 'flex',
    justifyContent: 'space-between'
  },
  info: {
    marginLeft: '24px'
  },
  summary: {
    marginBottom: '12px',
    textAlign   : 'center',
    fontSize    : '16px'
  },
  icon: {
    width : '24px',
    height: '24px'
  }
}
const Info = ({info, color}) => (
  <span style={{...style.info, color}} >{info}</span>
)
class TripInfo extends React.PureComponent {
  getIcon(keyname) {
     switch(keyname) {
      case 'where'  : return <Direction style={style.icon}/>
      case 'when'   : return <Calendar style={style.icon}/>
      case 'vehicle': return <Vehicle style={style.icon}/>
      case 'who'    : return <People style={style.icon}/>
      default       : return null
     }
  }
  renderItem () { // lmao what am i doing with my life?
    return _map(this.props.tripInfo, (value, key)=> {
      return (
        <div>
          <Divider inset/>
          <ListItem leftAvatar={this.getIcon(key)} disabled style={style.listItem}>
            <span style ={style.listHeader}>{key}</span><Info color={this.props.color} info={value}/>
          </ListItem>
        </div>
      )
    })
  }
  render () {
    return (
      <List>
        {this.renderItem()}
      </List>
    )
  }
}

type personalCardPropsType = {
  username : string,
  cardTitle: string,
  tripInfo : Object,
  cardText : string
};

class PersonalCard extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const {primary1Color} = this.props.muiTheme.palette
    return (
      <Card style={style.card}>
        <CardHeader
        avatar={ generateAvatar(this.props.username) }
        title={this.props.cardTitle}
        subtitle={this.props.username}
        />
        <CardMedia>
          <img src={this.props.imageUrl} alt="Image"/>
        </CardMedia>
        <CardText>
          <div style={style.cardText}>
            <span style={style.summary}>{this.props.cardText}</span>
            <TripInfo color={primary1Color} tripInfo={this.props.tripInfo}/>
          </div>
        </CardText>
      </Card>
    )
  }
}
export default muiThemeable()(PersonalCard)
