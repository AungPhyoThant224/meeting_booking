import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App'
import QueryProvider from '@/providers/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider>
        <App />
      </Provider>
    </QueryProvider>
  </React.StrictMode>,
)