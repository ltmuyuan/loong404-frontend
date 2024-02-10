import GlobalStyle from "./utils/GlobalStyle";
import {BrowserRouter as Router} from "react-router-dom";
import RouterLink from "./router/router";
import {PersistGate} from "redux-persist/integration/react";
import store,{persistor} from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
        <PersistGate loading={null} persistor={persistor} >
            <Provider store={store}>
                <Router>
                    <RouterLink />
                </Router>
                <GlobalStyle />
            </Provider>
        </PersistGate>
    </>
  )
}

export default App
