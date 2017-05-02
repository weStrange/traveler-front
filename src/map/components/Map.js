/* @flow */
'use strict'

import React from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const mapWidth = window.innerWidth - 30
const mapHeight = window.innerHeight - 30

type WorldMapProps = {
  markers: any,
  onMarkerRightClick?: () => void,
  onMapLoad?: () => void,
  onMapClick?: () => void
}

export const Wrapper = withScriptjs(withGoogleMap(function WorldMap ({
  markers,
  onMarkerRightClick = () => {},
  onMapLoad = () => {},
  onMapClick = () => {}
}: WorldMapProps) {
  return (
    <GoogleMap
      ref={onMapLoad}
      defaultZoom={3}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
      onClick={onMapClick}
    >
      {markers.map((marker, index) => (
        <Marker
          {...marker}
          onRightClick={() => onMarkerRightClick(index)}
        />
      ))}
    </GoogleMap>
  )
}))

type MapWrapperProps = {
  markers: any,
  onMarkerRightClick?: () => void,
  onMapLoad?: () => void,
  onMapClick?: () => void,
  containerElement?: any,
  mapElement?: any,
  googleMapURL?: any,
  loadingElement?: any
}

export default function MapWrapper ({
  markers,
  onMarkerRightClick = () => {},
  onMapLoad = () => {},
  onMapClick = () => {},
  containerElement = (
    <div style={{ height: mapHeight, width: mapWidth }} />
  ),
  mapElement = (
    <div style={{ height: mapHeight, width: mapWidth }} />
  ),
  googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp',
  loadingElement = (
    <div style={{ height: mapHeight }}>
      WAIT!!!!!
    </div>
  )
}: MapWrapperProps) {
  return (
    <Wrapper
      googleMapURL={googleMapURL}
      loadingElement={loadingElement}
      containerElement={containerElement}
      mapElement={mapElement}
      markers={markers}
      onMarkerRightClick={onMarkerRightClick}
      onMapLoad={onMapLoad}
      onMapClick={onMapClick} />
  )
}
