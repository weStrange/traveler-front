/* @flow */
'use strict'

import React from 'react'

type BackGroundProps = {
  image: string,
  children: any
}

export default function BackGround ({
  image,
  children
  // $FlowIgnore
}: BackGroundProps) {
  const childStyle = children.props.style
  const newStyle = {
    ...childStyle,
    position: 'absolute',
    bottom: '13%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    paddingLeft: 'auto',
    paddingRight: 'auto'
  }
  const newChild = { ...children, props: { ...children.props, style: newStyle } }
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      { newChild }
    </div>
  )
}
