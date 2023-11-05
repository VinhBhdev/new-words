import { combineReducers } from "redux";
import wordReducer from "./wordReducer";
import practiceReducer from "./practiceReducer";

const core = combineReducers({
    wordReducer,
    practiceReducer
})
export default core;
