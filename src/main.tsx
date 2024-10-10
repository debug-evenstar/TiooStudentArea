import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
// import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider } from "@material-tailwind/react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCirclesLoading } from "./old-components/Ui/Loading";
import App from "./App";
import { ScaleLoader } from "react-spinners";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="w-full h-screen inset-0 absolute flex items-center justify-center">
            <span>
              <ScaleLoader height={30} speedMultiplier={1.3} color="#9c29b2" />
            </span>
          </div>
        }
        persistor={persistor}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          transition={Flip}
          draggable
          pauseOnHover
          theme="light"
          className="index-20"
        />
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
