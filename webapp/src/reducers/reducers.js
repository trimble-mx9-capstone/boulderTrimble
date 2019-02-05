import { combineReducers } from "redux";
import index from './IndexReducer';
import dropdown from './FilterDropdownReducer';

export default combineReducers({
    index,
    dropdown
});