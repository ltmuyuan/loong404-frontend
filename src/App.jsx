import GlobalStyle from "./utils/GlobalStyle";
import {BrowserRouter as Router} from "react-router-dom";
import RouterLink from "./router/router";
import {PersistGate} from "redux-persist/integration/react";
import store,{persistor} from "./store";
import { Provider } from "react-redux";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '00a2aff76270ce36b305c8c069d5c080'

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain

}

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
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
