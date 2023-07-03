import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./features/translation";
import modalReducer from "./features/dialog";
import notificationReducer from "./features/notification";
const store = configureStore({
  reducer: {
    lang: translationReducer,
    modal: modalReducer,
    notification: notificationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // for typing useSelector()
export type AppDispatch = typeof store.dispatch; // for typing useDispatch()
