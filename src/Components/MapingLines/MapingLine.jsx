import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import GoogleMaps from './GoogleMaps'

function MapingLine({
  setSearchResultsForMapingThunkCreator,
  allStopsJson,
  searchResultsForMaping,
  ownProps,
}) {
  const { number } = useParams()
  const { transportType } = useParams()
  const showNav = ownProps.showNav
  const setShowNav = ownProps.setShowNav

  // if there is url, then dispatch data from url:
  useEffect(() => {
    if (transportType && number) {
      setSearchResultsForMapingThunkCreator(number, parseInt(transportType), allStopsJson)
    }
  }, [number, transportType, allStopsJson, setSearchResultsForMapingThunkCreator])

  return (
    <GoogleMaps searchResultsForMaping={searchResultsForMaping} showNav={showNav} setShowNav={setShowNav} />
  )
}

MapingLine.propTypes = {
  setSearchResultsForMapingThunkCreator: PropTypes.func.isRequired,
  allStopsJson: PropTypes.arrayOf(PropTypes.array).isRequired,
  searchResultsForMaping: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default MapingLine
