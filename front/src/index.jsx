import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";
import { Provider } from "react-redux";
import ScrollToTop from "@components/common/ScrollToTop";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
