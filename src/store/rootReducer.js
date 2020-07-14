import { combineReducers } from "redux";
import appState from "./appState/reducer";
import parks from "./user/reducer";
import user from "./parks/reducer";

export default combineReducers({
  appState,
  parks,
  user,
});
