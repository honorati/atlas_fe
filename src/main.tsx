import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/App.css'
import './style/checkbox.css'
import './style/classes.css'
import { WYSIWIG } from './components/text.editor.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <WYSIWIG/>
  </React.StrictMode>, 
)
