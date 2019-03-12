let defaultState = { 
    selected: ["fireHydrant", "stopSign", "streetLight"] 
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