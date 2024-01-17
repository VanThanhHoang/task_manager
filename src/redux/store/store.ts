import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persitStorage from "./persitStorage";
import { createTransform, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { appSlice } from "../slices/app.slice";
import { PersistConfig } from "redux-persist/es/types";
import { LocalStorageKey, SLICE_NAME } from "../constant";
import { userSlice } from "../slices/user.slice";
const rootReducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
});
const persistConfig: PersistConfig<any> = {
  key: LocalStorageKey.ROOT,
  version: 1,
  storage: persitStorage,
  timeout: 0,
  whitelist: [SLICE_NAME.APP,SLICE_NAME.USER]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState:any, key) => {
    // convert mySet to an Array.
    return { ...inboundState, mySet: [...inboundState.mySet,{isLoading:false}] };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['someReducer'] }
);
const store = configureStore({
  reducer: {
    root: persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, persistor };
