import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import CollegeReducer, { logout } from "./UserSlice";
import storage from "redux-persist/lib/storage";


const timeoutMiddleware = store => next => action =>
{
    const result = next(action)
    if(action.type  === '/')
    {
        setTimeout(()=>{
            store.dispatch(logout())
        },5000)
    }
    return result
}

const persistConfig = {
    key:"user",
    version:1,
    storage,
}

const rootReducer = combineReducers({
    user: CollegeReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)

let MainStore = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:
            {
                ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],}
        })
        .concat(timeoutMiddleware)
})

export default MainStore
export const Persistor = persistStore(MainStore)