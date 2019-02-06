import { combineReducers } from "redux";
import index from './IndexReducer';
import filter from './FilterDropdownReducer';
import location from './LocationDropdownReducer';

export default combineReducers({
    index,
    filter,
    location
});