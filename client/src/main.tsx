import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { CityStreetProvider } from './context/apiContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CityStreetProvider>
      <App />
    </CityStreetProvider>
  </StrictMode>,
)
