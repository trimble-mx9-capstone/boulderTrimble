let defaultState = { 
    city: "boulder",
    zoom: 12,
    lat: 40.029380,
    long: -105.239775,
    markers: [], 
    images_has_errored: false, 

};

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATE_CITY': 
            return {
                ...state, 
                city: action.city,
                zoom: action.zoom,
                lat: action.lat,
                long: action.lng
            }
        case 'IMAGES_HAS_ERRORED':
            return {
                ...state,
                images_has_errored: action.hasErrored
            }
        case 'ITEMS_IS_LOADING':
            return {
                ...state,
                images_is_loading: action.isLoading
            }
        case 'FETCH_MARKER_SUCCESS':
            return {
                ...state, 
                markers: action.markers 
            }

        default:
            return state;
    }
}

export default reducer;