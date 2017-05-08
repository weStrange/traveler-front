// FancyBox

import React, { Component } from 'react'
import { darkWhite } from 'material-ui/styles/colors'
import Radium from 'radium'
import Time from 'material-ui/svg-icons/device/access-time'

const randomizeMotion = () => {
  const floatingIconAnimation = Radium.keyframes({
    '0%': {
      // opacity: 1
    },
    '100%': {
      opacity: 0,
      transform: `translateY(-${Math.random() * (250 - 200) + 200}px) scale(1) rotate(${Math.random() * (360)}deg)`
    }
  }, 'float')
  return floatingIconAnimation
}
const styles = {
  base: {
    zIndex: 0,
    position: 'relative',
    minWidth: '100px',
    height: '100%',
    minHeight: '100px',
    overflow: 'hidden'
  },
  icons: {
    zIndex: 1,
    position: 'absolute',
    bottom: '-90px',
    transform: 'scale(3)'
  }
}
class FancyBox extends Component {
  makeIcons () {
    let icons = []
    let i = 0
    for (i = 0; i < 15; i++) {
      icons.push(
        <div key={`icon-${i}`} style={[styles.icons,
          {
            animation: `x ${Math.random() * (4 - 3) + 3}s infinite ease-out`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationName: randomizeMotion()
          }
        ]}>
          {
            (this.props.icon)
            ? React.cloneElement(this.props.icon, { color: darkWhite })
            : <Time color={darkWhite} />
          }
        </div>
      )
    }
    return icons
  }
  render () {
    const {
      backgroundColor,
      style,
      children
    } = this.props
    return (
      <div
        style={[styles.base, { backgroundColor: backgroundColor }, style]} >
        { (children) }
        {
          this.props.playAnimation && this.makeIcons()
        }
      </div>
    )
  }
}

export default Radium(FancyBox)
