import { combineReducers } from 'redux';
import { userReducer } from "./user.reducer";
import { searchReducer } from "./search.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;