import { StrictMode, version } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MainStore, { Persistor } from './ReduxWork/MainStore.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider
     store={MainStore}>
      <PersistGate persistor={Persistor}></PersistGate>
    <App/>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)

