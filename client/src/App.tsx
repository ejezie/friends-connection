import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import RouterConfig from "./routes/routesConfig";

function App() {
  return (
    <div className="bgcolor ">
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <RouterConfig />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    </div>
  );
}

export default App;
