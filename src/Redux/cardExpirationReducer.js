import {getDataCardExpAPI} from '../api/api'

const GET_DATA_CARD_EXPIRATION = 'GET_DATA_CARD_EXPIRATION'
const SET_ERROR_CARD_DATA = 'SET_ERROR_CARD_DATA'
const SET_LOADING_CARD_COMPONENT = 'SET_LOADING_CARD_COMPONENT'

const initialState = {
    data: {},
    error: {},
    cardCode: '',
    loading: false
}

const cardExpirationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_CARD_EXPIRATION:
            return {
                ...state, 
                data: action.res, 
                cardCode: action.res.cardCode, 
                error: {},
                loading: false
            }
        case SET_ERROR_CARD_DATA:
            return {
                ...state, 
                error: action.err, 
                cardCode: action.payload,
                data: {},
                loading: false
            }
        case SET_LOADING_CARD_COMPONENT:
            return {
                ...state,
                loading: action.loading,
                data: {},
                error: ''
            }         
        default: return state
    }
}

const setErrorCardDataActionCreator = (err, payload) => ({type: 'SET_ERROR_CARD_DATA', err, payload})
const setLoadingActionCreator = (loading) => ({type: SET_LOADING_CARD_COMPONENT, loading})

export const getDataCardExpirationThunk = (payload) => (dispatch) => {
    dispatch(setLoadingActionCreator(true))
    getDataCardExpAPI(payload)
    .then(res => dispatch(({type: 'GET_DATA_CARD_EXPIRATION', res})))
    .catch(err => dispatch(setErrorCardDataActionCreator(err, payload)))
    
} 

export default cardExpirationReducer