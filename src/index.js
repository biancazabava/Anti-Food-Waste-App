import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
// import promise from "redux-promise-middleware";
// import reducer from "./reducers";

// const middleware = [logger, promise];

// const store = configureStore({
//   reducer,
//   middleware,
// });

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* //<Provider store={store}>
    //</Provider> */}
    <App />
  </React.StrictMode>
);
