import { connect } from 'react-redux'
import BusPage from './BusPage'
import { getAllStopsThunkCreator, setInputValueActionCreator } from '../Redux/busStopReducer'
import {  setSortedArrayActionCreator } from '../Redux/savedStopsReducer'

const mapStateToProps = (state) => {
    return {
        busPage: state.busPage,
        savedStops: state.savedStops,
        settings: state.settings
    }
}

const mapDispatchToProps = {
    getAllStops: getAllStopsThunkCreator,
    setInputValue: setInputValueActionCreator,
    setSortedArray: setSortedArrayActionCreator
}

const BusPageContainer = connect(mapStateToProps, mapDispatchToProps)(BusPage)

export default BusPageContainer