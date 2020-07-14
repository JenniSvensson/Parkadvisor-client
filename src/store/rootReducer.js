import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import parks from "./parks/reducer"

export default combineReducers({
  appState,
  user,
  parks
});
