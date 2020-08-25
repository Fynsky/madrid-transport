export const loadPersStateCardExpiration = () => {
    try {
        const serializedState1 = JSON.parse(localStorage.getItem('cardExpiration'))
        const serializedState2 = JSON.parse(localStorage.getItem('settings'))
        const serializedState = {...serializedState1, ...serializedState2}
        if (serializedState === null){
            return undefined
        }
        // return mergedState
        return serializedState
    } catch (err) {
        return undefined
    }
}

export const getSavedStopsFromLocalStorage = () => {
    if ((localStorage['savedStops']) && Object.values(localStorage['savedStops']).length){
        return JSON.parse(localStorage['savedStops'])
    } else {
        return {items:[]}
    }
}

export const getVisitedStopsFromLocalStorage = () => {
    if ((localStorage['visitedStops']) && Object.values(localStorage['visitedStops']).length){
        const obj = JSON.parse(localStorage['visitedStops'])
        const arr = Object.entries(obj)
        return arr[0][1]
    } else {
        return []
    }
}

export const saveStateSavedStops = (savedStops) => {
    try {
        const stops = savedStops['savedStops']
        localStorage.setItem('savedStops', JSON.stringify(stops))
    } catch (err) {
        // Ignore write errors
    }
}

export const saveStateVisitedStops = (visitedStops) => {
    try {
        localStorage.setItem('visitedStops', JSON.stringify(visitedStops))
    } catch (err) {
        // Ignore write errors
    }
}

export const saveStateCardExpiration = (cardExpiration) => {
    try {
        const serializedState = JSON.stringify(cardExpiration)
        localStorage.setItem('cardExpiration', serializedState)
    } catch (err) {
        // Ignore write errors
    }
}

export const saveStateSettings = (settings) => {
    try {
        const serializedState = JSON.stringify(settings)
        localStorage.setItem('settings', serializedState)
    } catch (err) {
        // Ignore write errors
    }
}
