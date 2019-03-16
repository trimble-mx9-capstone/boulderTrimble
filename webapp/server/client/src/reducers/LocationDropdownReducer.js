let defaultState = { 
    city: "boulder",
    zoom: 12,
    lat: 40.029380,
    long: -105.239775,
    markers: generateMarkers(40.029380, -105.239775, 0.130058, 0.123352)
};

function generateMarkers(lat, long, latRange, longRange){
    var toMarker = []
    var minLat = lat-latRange/2
    var maxLat = lat+latRange/2
    var minLong = long-longRange/2
    var minLong = long+longRange/2
    //var testVar = `[{"id":1,"latitude":"40.01689","longitude":"-105.279617","url":"sample_image.jpg","has_stop_sign":true,"has_street_light":true}]`
    fetch('/api/images?minLat='+minLat+'&maxLat='+maxLat+'&minLong='+minLng+'&maxLong='+maxLng)
            .then(res => res.text())
            .then(newText => toMarker = JSON.parse(newText))
    //var toMarker = JSON.parse(testVar)
    var newMarkers = []
            
    toMarker.forEach(pastMarker => newMarkers = newMarkers.concat(createMarker(pastMarker)))

    return newMarkers
}

function createMarker(marker){
    console.log("I showed up here")
    var newTypes = []
    if (marker.has_stop_sign) newTypes = newTypes.concat("stopSign")
    if (marker.has_street_light) newTypes = newTypes.concat("streetLight")
    return {types: newTypes, location: {
        latLong: [parseFloat(marker.latitude), parseFloat(marker.longitude)]
    }, img: marker.url}
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATE_CITY': 
            var newMarkers = generateMarkers(action.lat, action.lng, action.latRange, action.lngRange)

            return {
                ...state, 
                city: action.city,
                markers: newMarkers,
                zoom: action.zoom,
                lat: action.lat,
                long: action.lng
            }
        default:
            return state;
    }
}

export default reducer;