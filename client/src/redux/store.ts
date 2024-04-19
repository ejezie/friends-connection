import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { user, theme } from "./slices";
import apiSlice from "@/services/api/api";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistConfig: any = {
  key: "root",
  storage,
  version: 1,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_REACT_ENCRYPT_KEY
        ? import.meta.env.VITE_REACT_ENCRYPT_KEY
        : "SecreteKey",
      onError: function (error) {
        // Handle the error.
        console.log(error);
      },
    }),
  ],
  stateReconciler: hardSet,
  blacklist: [apiSlice.reducerPath],
};

const rootReducer = combineReducers({
  user,
  theme,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["betslip"],
      },
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export default store;
export { persistor };
