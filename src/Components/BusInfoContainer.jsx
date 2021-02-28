import { connect } from 'react-redux'
import BusInfo from './BusInfo'
import { getDataFromStopNumberThunk } from '../Redux/busStopReducer'
import { addFavorActionCreator, removeFavorActionCreator } from '../Redux/savedStopsReducer'

const mapStateToProps = state => {
  return {
    busPage: state.busPage,
    savedStops: state.savedStops,
    settings: state.settings,
  }
}
const mapDispatchToProps = {
  getDataFromStopNumber: getDataFromStopNumberThunk,
  addFavorStop: addFavorActionCreator,
  removeFavorStop: removeFavorActionCreator,
}
const BusInfoContainer = connect(mapStateToProps, mapDispatchToProps)(BusInfo)

export default BusInfoContainer
