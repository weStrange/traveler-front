/* @flow */
'use strict'

import React from 'react'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import type { GoogleLocation } from '../../core/types'

const mapWidth = window.innerWidth - 30
const mapHeight = window.innerHeight - 30

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

export default function MapWrapper ({
  markers,
  onMarkerClick = (index: number) => {},
  onMarkerRightClick = () => {},
  onMapLoad = () => {},
  onMapClick = () => {},
  containerElement = (
    <div style={{ height: mapHeight, width: mapWidth }} />
  ),
  mapElement = (
    <div style={{ height: mapHeight, width: mapWidth }} />
  ),
  googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDKLbjNVBVXNyxZni7LJRA12_auYQsLrB8&libraries=places&v=3.exp',
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
      onMarkerClick={onMarkerClick}
      onMarkerRightClick={onMarkerRightClick}
      onMapLoad={onMapLoad}
      onMapClick={onMapClick} />
  )
}
