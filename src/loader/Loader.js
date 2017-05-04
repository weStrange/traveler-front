import React, { Component } from 'react'
import './loader.css'
import muiThemeable from 'material-ui/styles/muiThemeable'

const style = {
  default: {
    position: 'fixed',
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: '18px',
    display: 'block',
    fontFamily: 'Roboto, san-serif',
    fontWeight: '500'
  }
}
export class Loader extends Component {
  render () {
    const {color} = this.props
    return (
      <div style={{display: 'block'}}>
        <span className='loader' style={{borderColor: color}}>
          <span className='loader-inner' style={{backgroundColor: color}} />
        </span>
      </div>
    )
  }
}

class LoaderFullScreen extends Component {
  render () {
    const {palette} = this.props.muiTheme
    return (
      <div
        style={{...style.default, ...this.props.style, backgroundColor: palette.primary2Color}}
      >
        <Loader color={palette.accent2Color} />
        <h3 style={{...style.text, color: palette.accent1Color}}>{this.props.text}</h3>
      </div>)
  }
}
export default muiThemeable()(LoaderFullScreen)
