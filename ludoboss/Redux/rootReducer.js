import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { gameReducer } from "./game/gameReducer";
import { ReverseReducer } from "./game/ReverseReducer";
import { ModalReducer } from "./modal/modal";
import { settingsReducer } from "./settings/settingsReducer";
import userReducer from './user/userReducer'
const rootReducer = combineReducers({
    user : userReducer,
    game : gameReducer,
    settings : settingsReducer,
    modal : ModalReducer,
    reverse : ReverseReducer,
})

const store = createStore(rootReducer);

export default store;