import GlobalStyle from "./utils/GlobalStyle";
import {BrowserRouter as Router} from "react-router-dom";
import RouterLink from "./router/router";
import {PersistGate} from "redux-persist/integration/react";
import store,{persistor} from "./store";
import { Provider } from "react-redux";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import {ConfigProvider } from 'antd';
import {chain} from "./common/config.js";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '00a2aff76270ce36b305c8c069d5c080'

const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain

}

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [chain],
    projectId,
    enableAnalytics: false,
    themeVariables: {
        // '--w3m-color-mix': '#ece2cf',
        // '--w3m-color-mix-strength': 40
    }
})


function App() {
  return (
    <>
        <ConfigProvider
            theme={{
                token: {
                    colorText:"#fff",
                    colorIcon:"rgba(255,255,255,0.8)",
                    colorError:"#ff4d4f",
                    colorSuccess:"#52c41a",
                    colorBgElevated: '#303030',
                },
            }}
        >
        <PersistGate loading={null} persistor={persistor} >
            <Provider store={store}>
                <Router>
                    <RouterLink />
                </Router>
                <GlobalStyle />
            </Provider>
        </PersistGate>
        </ConfigProvider>
    </>
  )
}

export default App
