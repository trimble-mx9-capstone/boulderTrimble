let defaultState = { 
    city: "boulder",
    zoom: 14,
    markers: [
        {
            types: ["fireHydrant","streetLight"],
            location: {
                latLong: [40.016869, -105.279617]
            },
            img: 'sample_image.jpg'
        }
    ]
};

function createMarker(marker, cit){
    console.log("I showed up here")
    var newTypes = []
    if (marker.has_stop_sign) newTypes = newTypes.concat("stopSign")
    if (marker.has_street_light) newTypes = newTypes.concat("streetLight")
    return {types: newTypes, location: {
        city: cit, // I'm not even sure we should have this city marker here anymore?
        latLong: [parseFloat(marker.latitude), parseFloat(marker.longitude)]
    }, img: marker.url}
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATE_CITY': 
            var toMarker = []
            //fetch('/api/images?lat=thisislat&long=thisislong')
            var minLat = action.lat-action.latRange/2
            var maxLat = action.lag+action.lagRange/2
            var minLng = action.lng-action.lngRange/2
            var maxLng = action.lng+action.lngRange/2
            fetch('/api/images?minLat='+minLat+'&maxLat='+maxLat+'&minLong='+minLng+'&maxLong='+maxLng)
            .then(res => res.text())
            .then(newText => toMarker = JSON.parse(newText))
            var newMarkers = []
            
            toMarker.forEach(pastMarker => newMarkers = newMarkers.concat(createMarker(pastMarker, action.city)))

            console.log(newMarkers)

            return {
                ...state, 
                city: action.city,
                markers: newMarkers,
                zoom: action.zoom
            }
        default:
            return state;
    }
}

export default reducer;