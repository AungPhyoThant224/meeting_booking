import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App'
import QueryProvider from '@/providers/QueryProvider'
import { Toaster } from './components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider>
        <App />
        <Toaster />
      </Provider>
    </QueryProvider>
  </React.StrictMode>,
)