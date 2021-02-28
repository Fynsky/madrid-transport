import React from 'react'
import { useParams } from 'react-router-dom'
import 'pinch-zoom-element'
import classNames from 'classnames'

import style from './Maps.module.scss'
import mapMetro from '../../assets/images/mapa_metro.jpg'
import mapNight from '../../assets/images/mapa_emt_nocturnos.jpg'
import planCerc from '../../assets/images/plano_cercanias.jpg'
import planMetro from '../../assets/images/plano_metro.jpg'

function MapItem({ showNav, setShowNav }) {
  const { mapUrl } = useParams()
  const classNameMainMapItem = classNames(style.mapItemDiv, { [style.showNav]: showNav })
  const image = getImage(mapUrl)

  return (
    <div className={classNameMainMapItem}>
      <pinch-zoom>
        <img src={image} alt="map" />
      </pinch-zoom>
    </div>
  )
}

export default MapItem

function getImage(mapUrl) {
  if (mapUrl === 'planCerc') {
    return planCerc
  } else if (mapUrl === 'planMetro') {
    return planMetro
  } else if (mapUrl === 'mapMetro') {
    return mapMetro
  } else if (mapUrl === 'mapNight') {
    return mapNight
  }
}
