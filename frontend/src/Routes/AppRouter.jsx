import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import {Landing,Resume} from '../component/Pages/index'
import ATSscore from '../component/Pages/ATSscore'

const AppRouter = createBrowserRouter([
    {
        path:"",
        element: <App/>,
        children:[
            {
                path:'/',
                element:<Landing/>
            },
            {
                path:'/create-resume',
                element:<Resume/>
            },
            {
                path:'/ats-score',
                element:<ATSscore/>
            }
        ]
    }
])

export default AppRouter