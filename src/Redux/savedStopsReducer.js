import { getSavedStopsFromLocalStorage } from '../localStorage/localStorage'

const ADD_TO_FAVOR = 'ADD_TO_FAVOR'
const REMOVE_FROM_FAVOR = 'REMOVE_FROM_FAVOR'
const SET_SORTED_ARRAY = 'SET_SORTED_ARRAY'

const initialState = {
  stops: getSavedStopsFromLocalStorage(),
}

const savedStopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOR:
      return {
        ...state,
        stops: {
          ...state.stops,
          items: [...state.stops.items, action.item],
        },
      }
    case REMOVE_FROM_FAVOR:
      return {
        ...state,
        stops: {
          ...state.stops,
          items: state.stops.items.filter(i => {
            if (i.stopNumber !== action.item.stopNumber) {
              return true
            } else {
              return false
            }
          }),
        },
      }
    case SET_SORTED_ARRAY:
      return {
        ...state,
        stops: {
          ...state.stops,
          items: action.sortedArray,
        },
      }
    default:
      return state
  }
}

export const addFavorActionCreator = item => ({ type: 'ADD_TO_FAVOR', item })
export const removeFavorActionCreator = item => ({ type: 'REMOVE_FROM_FAVOR', item })
export const setSortedArrayActionCreator = sortedArray => ({ type: SET_SORTED_ARRAY, sortedArray })

export default savedStopsReducer
