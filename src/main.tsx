import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from '@/app/App.tsx'
import {ErrorBoundary} from "@/features/ErrorBoundary";
import {GlobalStyles} from "@/styles/GlobalStyles.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GlobalStyles/>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
