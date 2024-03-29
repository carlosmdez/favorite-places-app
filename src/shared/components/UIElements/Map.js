import React, { useRef, useEffect } from 'react'

import './Map.css'

const Map = props => {
  const { className, center, style, zoom } = props
  const mapRef = useRef(null)

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, { center, zoom })
    new window.google.maps.Marker({ position: center, map })
  }, [center, zoom])

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>
}

export default Map
