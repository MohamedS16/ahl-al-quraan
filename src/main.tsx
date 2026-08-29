import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryclient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
)
