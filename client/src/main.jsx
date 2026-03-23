import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter} from "react-router-dom"
import App from './App.jsx'
import './css/index.css'

const router = createHashRouter([
  {path: "", element: <App/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
