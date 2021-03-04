import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../features/appReducer";

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
