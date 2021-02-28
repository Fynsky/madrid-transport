import { getDataAPI, getArrayAllBusStopsAPI } from '../api/api'
import { getVisitedStopsFromLocalStorage } from '../localStorage/localStorage'

const SET_DATA = 'SET_DATA'
const SET_COUNTER = 'SET_COUNTER'
const SET_ERROR = 'SET_ERROR'
const SET_LOADING = 'SET_LOADING'
const SET_ALL_STOPS = 'SET_ALL_STOPS'
const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
const SET_SEARCH_RESULTS_FOR_MAPING = 'SET_SEARCH_RESULTS_FOR_MAPING'

const initialState = {
  counter: 0,
  data: {},
  error: '',
  alert: null,
  loading: false,
  visitedStops: getVisitedStopsFromLocalStorage(),
  stopsPopular: [
    { name: 'Intercambiador Moncloa', numStop: '06002' },
    { name: 'Cibeles', numStop: '72' },
    { name: 'Atocha', numStop: '5-11' },
    { name: 'Sol', numStop: '4-12' },
    { name: 'Colonia Jardin', numStop: '10-10' },
  ],
  allStopsJson: [],
  inputValue: '',
  searchResults: [],
  searchResultsForMaping: [],
}

const busStopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
        counter: state.counter + 1,
        error: '',
        alert: null,
        visitedStops: addToArrayIfNotPresent(state.visitedStops, action.data.stopNumber),
        loading: false,
      }
    case SET_COUNTER:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        data: {},
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
        data: {},
        error: '',
      }
    case SET_ALL_STOPS:
      return {
        ...state,
        allStopsJson: action.jsonStops,
        searchResults: action.jsonStops,
      }
    case SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.inputValue,
        searchResults: state.allStopsJson
          ? state.allStopsJson.filter(item => item[1].toUpperCase().includes(action.inputValue.toUpperCase()))
          : [],
      }
    case SET_SEARCH_RESULTS_FOR_MAPING:
      return {
        ...state,
        searchResultsForMaping: state.allStopsJson.filter(item => {
          if (item[6] === action.transportType) {
            const result = item[4].filter(i => i === action.lineNumber)
            if (result.length > 0) {
              return item
            }
          }
        }),
      }
    default:
      return state
  }
}

export const setDataActionCreator = data => ({ type: SET_DATA, data })
export const setCounterActionCreator = () => ({ type: SET_COUNTER })
export const setErrorActionCreator = error => ({ type: SET_ERROR, error })
export const setLoadingActionCreator = loading => ({ type: SET_LOADING, loading })
export const setAllStopsJsonActionCreator = jsonStops => ({ type: SET_ALL_STOPS, jsonStops })
export const setInputValueActionCreator = inputValue => ({ type: SET_INPUT_VALUE, inputValue })
export const setSearchResultsForMapingActionCreator = (lineNumber, transportType) => ({
  type: SET_SEARCH_RESULTS_FOR_MAPING,
  lineNumber,
  transportType,
})

export const getDataFromStopNumberThunk = busStop => dispatch => {
  dispatch(setLoadingActionCreator(true))
  getDataAPI(busStop)
    .then(data => dispatch(setDataActionCreator(data)))
    .catch(err => dispatch(setErrorActionCreator(err)))
}

export const getAllStopsThunkCreator = () => dispatch => {
  getArrayAllBusStopsAPI()
    .then(response => {
      dispatch(setAllStopsJsonActionCreator(response.data))
    })
    .catch(err => dispatch(setAllStopsJsonActionCreator(null)))
}

export const setSearchResultsForMapingThunkCreator = (lineNumber, transportType, allStopsJson) => dispatch => {
  if (!allStopsJson.length) {
    getArrayAllBusStopsAPI()
      .then(response => {
        dispatch(setAllStopsJsonActionCreator(response.data))
      })
      .then(() => {
        dispatch(setSearchResultsForMapingActionCreator(lineNumber, transportType))
      })
      .catch(err => dispatch(setAllStopsJsonActionCreator([])))
  } else {
    dispatch(setSearchResultsForMapingActionCreator(lineNumber, transportType))
  }
}

const addToArrayIfNotPresent = (originalArray, newElement) => {
  const foundElement = originalArray.find(currentElement => {
    return currentElement === newElement
  })
  if (foundElement) {
    return originalArray
  }
  if (originalArray.length === 10) {
    originalArray.splice(0, 1)
  }
  return [...originalArray, newElement]
}

export default busStopReducer
