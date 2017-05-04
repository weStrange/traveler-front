/* @flow */
'use strict'

import React, { Component } from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import type { GoogleLocation } from '../../core/types'

type WorldMapProps = {
  markers: any,
  center?: GoogleLocation,
  zoom?: number,
  onMarkerClick?: () => void,
  onMarkerRightClick?: () => void,
  onMapLoad?: () => void,
  onMapClick?: () => void
}

export const Wrapper = withScriptjs(withGoogleMap(function WorldMap ({
  markers,
  zoom = 4,
  center = { lat: -25.363882, lng: 131.044922 },
  onMarkerClick = () => {},
  onMarkerRightClick = () => {},
  onMapLoad = () => {},
  onMapClick = () => {}
}: WorldMapProps) {
  return (
    <GoogleMap
      ref={onMapLoad}
      onClick={onMapClick}
      center={center}
      zoom={zoom}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          {...marker}
          onClick={() => onMarkerClick(index)}
          onRightClick={() => onMarkerRightClick(index)}
        />
      ))}
    </GoogleMap>
  )
}))

type MapWrapperProps = {
  markers: any,
  onMarkerClick?: (index: number) => void,
  onMarkerRightClick?: () => void,
  onMapLoad?: () => void,
  onMapClick?: () => void,
  containerElement?: any,
  mapElement?: any,
  googleMapURL?: any,
  loadingElement?: any
}

type MapWrapperState = {
  width: number,
  height: number
}

export default class MapWrapper extends Component {
  props: MapWrapperProps;
  state: MapWrapperState;
  updateDimensions: () => void;

  constructor (props: MapWrapperProps) {
    super(props)
    this.state = {
      width: window.innerWidth - 15,
      height: window.innerHeight - 80
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions () {
    this.setState({
      width: window.innerWidth - 15,
      height: window.innerHeight - 80
    })
  }

  componentWillMount () {
    this.updateDimensions()
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render () {
    const {
      markers,
      onMarkerClick = (index: number) => {},
      onMarkerRightClick = () => {},
      onMapLoad = () => {},
      onMapClick = () => {},
      containerElement = (
        <div style={{
          height: this.state.height,
          width: this.state.width
        }} />
      ),
      mapElement = (
        <div style={{
          height: this.state.height,
          width: this.state.width
        }} />
      ),
      googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDKLbjNVBVXNyxZni7LJRA12_auYQsLrB8&libraries=places&v=3.exp',
      loadingElement = (
        <div style={{ height: this.state.height }} />
      )
    } = this.props

    return (
      <Wrapper
        googleMapURL={googleMapURL}
        loadingElement={loadingElement}
        containerElement={containerElement}
        mapElement={mapElement}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onMarkerRightClick={onMarkerRightClick}
        onMapLoad={onMapLoad}
        onMapClick={onMapClick} />
    )
  }
}
