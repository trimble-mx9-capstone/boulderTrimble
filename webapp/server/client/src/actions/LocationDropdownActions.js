export function updateCity(city, lat, lng, latRng, lngRng, zoom){
    return {
        type: "UPDATE_CITY",
        city,
        lat,
        lng,
        latRng,
        lngRng,
        zoom
    }
}

export function imagesHasErrored(bool){
    return {
        type: 'IMAGES_HAS_ERRORED', 
        hasErrored: bool 
    };
}

export function imagesIsLoading(bool){
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool 
    };
}

export function fetchMarkerSuccess(markers){
    return {
        type: 'FETCH_MARKER_SUCCESS',
        markers
    }
}

export function imagesFetchData(url){
    return (dispatch) => {
        dispatch(imagesIsLoading(true));

        fetch(url)
            .then(res => res.text()) 
            .then(newText => {
                var markers = [];
                var resJson = JSON.parse(newText);
                resJson.forEach(resMarker => markers.push(createMarker(resMarker)));
                
                dispatch(imagesHasErrored(false));
                dispatch(imagesIsLoading(false));
                return markers;
            })
            .then(markers => dispatch(fetchMarkerSuccess(markers)))
            .catch(() => dispatch(imagesHasErrored(true)));
    };
}

function createMarker(marker){
    var newTypes = []
    if (marker.has_stop_sign) newTypes.push("stopSign")
    if (marker.has_street_light) newTypes.push("streetLight")
    return {
        types: newTypes, 
        location: {
            latLong: [parseFloat(marker.latitude), parseFloat(marker.longitude)]
        }, 
        img: marker.url
    }
}