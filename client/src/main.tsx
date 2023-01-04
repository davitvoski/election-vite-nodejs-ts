import React, { createContext, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { BC } from './component/canada/british-colombia/BC'
import QC from './component/canada/quebec/QC'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
      [
        {
          index: true,
          element: <QC />
        },
        {

          path: "/quebec/:year",
          element: <QC />
        },
        {
          path: "/british-columbia/:year",
          element: <BC />,


        },
        {
          path: "*",
          element: <h1>404 not found</h1>
        }
      ]
  }
]
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
