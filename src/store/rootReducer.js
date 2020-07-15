import { combineReducers } from "redux";
import appState from "./appState/reducer";
import parks from "./parks/reducer";
import user from "./user/reducer";
import reviews from "./reviews/reducer";

export default combineReducers({
  appState,
  user,
  parks,
  reviews,
});
