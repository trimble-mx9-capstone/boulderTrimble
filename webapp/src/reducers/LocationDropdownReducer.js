let defaultState = { 
    location: "Boulder",
    lat: 40.016869,
    lng: -105.279617,
};

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATE_FILTER': 
            return {
                ...state, 
                selected: action.selectedOptions
            }
        default:
            return state;
    }
}

export default reducer;