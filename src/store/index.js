import {combineReducers} from "redux";
import post from '../store/postSlice';
const rootReducer = combineReducers({
    post,
    devTools: true,
});
export default rootReducer;