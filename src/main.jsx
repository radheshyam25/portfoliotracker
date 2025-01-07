import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./store/store.js"
import {Provider} from "react-redux";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import AddStock from "./pages/AddStock.jsx"
import SellStock from "./pages/SellStock.jsx"
import DashBoard from './pages/DashBoard.jsx';
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.jsx'




const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:<Home/>,
        },

        {
          path:"/login",
          element:<Login/>
        },

        {
          path:"/signup",
          element:<Signup/>
        },

        {
          path:"/add-stock",
          element:<AddStock/>
        },

        {
          path:"/sell-stock",
          element:<SellStock/>
        },

        {
          path:"Dashboard",
          element:<DashBoard/>
        }

      
        
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
