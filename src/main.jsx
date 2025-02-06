import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthContextProvider } from "./context/authContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  </StrictMode>
);
