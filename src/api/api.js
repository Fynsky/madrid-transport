import * as axios from 'axios'

export const getDataAPI = (busStop) => axios.get(`https://api.interurbanos.welbits.com/v1/stop/${busStop}`)
    .then(res => res.data)
        

export const getDataCardExpAPI = (number) => axios.get(`https://api.interurbanos.welbits.com/v1/transport-cards/${number}`)
    .then(res => res.data)


export const getArrayAllBusStops = () => axios.get(`/jsonStops.json`)
