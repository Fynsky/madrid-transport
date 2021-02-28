import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import 'pinch-zoom-element'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import ConsultStop from './ConsultStop'

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkmmOUieIPx8iN6dc63tNE5VIXiqGpJdo&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 40.349417488047, lng: -3.71323124878974 },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={props.defaultCenter} key={new Date().getTime()}>
      <pinch-zoom>
        <div>
          {props.searchResultsForMaping.map(item => (
            <Marker
              item={item}
              position={{ lat: item[2], lng: item[3] }}
              key={item[0]}
              onClick={() => props.onMarkerClick(item)}
            >
              {props.isOpen === item[0] && (
                <InfoWindow options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                  <ConsultStop history={props.history} item={item} />
                </InfoWindow>
              )}
            </Marker>
          ))}
        </div>
      </pinch-zoom>
    </GoogleMap>
  </div>
))

MyMapComponent.propTypes = {
  defaultZoom: PropTypes.number.isRequired,
  defaultCenter: PropTypes.object.isRequired,
  searchResultsForMaping: PropTypes.arrayOf(PropTypes.array).isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  isOpen: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

const GoogleMaps = React.memo(props => {
  const history = useHistory()
  const searchResultsForMaping = props.searchResultsForMaping
  const [defaultCenter, setDefaultCenter] = useState({ lat: 40.349417488047, lng: -3.71323124878974 })
  const [defaultZoom, setDefaultZoom] = useState(10)
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = useState('')

  const handleToggleOpen = (item, e) => {
    setDefaultCenter({ lat: item[2], lng: item[3] })
    setDefaultZoom(16)
    setOpenInfoWindowMarkerId(item[0])
  }

  return (
    <MyMapComponent
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onMarkerClick={handleToggleOpen}
      isOpen={openInfoWindowMarkerId}
      history={history}
      searchResultsForMaping={searchResultsForMaping}
    />
  )
})

export default GoogleMaps
