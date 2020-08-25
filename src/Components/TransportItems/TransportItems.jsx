import React from 'react'
import PropTypes from 'prop-types'

import { EMT, METRO, CERCANIAS, INTERURBAN, NOCTURNO, LIGHT_METRO, URBAN } from '../Stop/Stop'
import Cercanias from './Cercanias'
import Buses from './Buses'

function getTypeOfTransportFromDataTransportType(data) {
    if (data[1][0].source === METRO){
        return METRO
    } else if (data[1][0].source === CERCANIAS){
        return CERCANIAS
    } else if (data[1][0].source === LIGHT_METRO){
        return LIGHT_METRO
    } else if (data[1][0].isNightLine === true){
        return NOCTURNO
    } else if (data[1][0].source === INTERURBAN){
        return INTERURBAN
    } else if (data[1][0].source === URBAN){
        return URBAN
    } else  if (data[1][0].source === EMT){
        return EMT
    } else {
        return undefined
    }
}

function TransportItems({ data, settings }) {
    const type = getTypeOfTransportFromDataTransportType(data)
    // console.log('data[1][0].source:', data[1][0].source)
    // console.log('data', data)
    // console.log('TransportItems type:', type)
    const arrivalData = data[1]
    return (
        <div>
            {(type === EMT || type === INTERURBAN || type === URBAN || type === NOCTURNO ) ? 
            <Buses arrivalData={arrivalData} type={type} settings={settings} /> :
            ((type === LIGHT_METRO || type === METRO || type === CERCANIAS) ?
            <Cercanias arrivalData={arrivalData} type={type} settings={settings} /> :
            <div>'undefined type of transport'</div>)}

            {/* {type === EMT && <Buses arrivalData={arrivalData} type={type} settings={settings} />}
            {type === INTERURBAN && <Buses arrivalData={arrivalData} type={type} settings={settings} />}
            {type === URBAN && <Buses arrivalData={arrivalData} type={type} settings={settings} />}
            {type === NOCTURNO && <Buses arrivalData={arrivalData} type={type} settings={settings} />}
            {type === METRO && <Cercanias arrivalData={arrivalData} type={type} settings={settings} />}   
            {type === LIGHT_METRO && <Cercanias arrivalData={arrivalData} type={type} settings={settings} />}   
            {type === CERCANIAS && <Cercanias arrivalData={arrivalData} type={type} settings={settings} />}  
            {!type && <div>'undefined type of transport'</div>}   */}
        </div>
    )
}

TransportItems.propTypes = {
    data: PropTypes.array.isRequired,
    number: PropTypes.string,
    arrivalData: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string
}
export default TransportItems

