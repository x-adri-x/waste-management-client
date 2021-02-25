import React from 'react'
import {GoogleMap, DirectionsRenderer, withScriptjs, withGoogleMap} from 'react-google-maps'



function Map() {
    return (
        <GoogleMap
        defaultZoom = {10}
        defaultCenter = {{lat: 45.42, lng: -75.69}}
        />
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap

