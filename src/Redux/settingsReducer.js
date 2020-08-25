const SET_THEME = 'SET_THEME'
const SET_LANGUAGE = 'SET_LANGUAGE'

const initialState = {
    screenTheme: 'light',
    systemLanguage: 'english'
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_THEME:
            return {
                ...state,
                screenTheme: action.theme
            }
        case SET_LANGUAGE:
            return {
                ...state,
                systemLanguage: action.language
            }
        default: return state
    }
}

export const setThemeActionCreator = (theme) => ({type: SET_THEME, theme})
export const setLanguageActionCreator = (language) => ({type: SET_LANGUAGE, language})

export default settingsReducer