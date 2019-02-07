let defaultState = { 
    city: "boulder"
};

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'UPDATE_CITY': 
            return {
                ...state, 
                city: action.city
            }
        default:
            return state;
    }
}

export default reducer;