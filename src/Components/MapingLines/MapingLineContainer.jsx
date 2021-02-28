import { connect } from 'react-redux'
import MapingLine from './MapingLine'
import { setSearchResultsForMapingThunkCreator } from '../../Redux/busStopReducer'

const mapStateToProps = (state, ownProps) => {
  return {
    searchResultsForMaping: state.busPage.searchResultsForMaping,
    allStopsJson: state.busPage.allStopsJson,
    ownProps: ownProps,
  }
}

const mapDispatchToProps = {
  setSearchResultsForMapingThunkCreator,
}

const MapingLineContainer = connect(mapStateToProps, mapDispatchToProps)(MapingLine)

export default MapingLineContainer
