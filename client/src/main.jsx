import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify"; // <-- Add this import
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
