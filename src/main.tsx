import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import './style/checkbox.css'
import { SignUp } from './components/signup.component.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <SignUp/>
  </React.StrictMode>,
)
