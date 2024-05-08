import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Layout from './pages/Layout'
import Home from './pages/PrivatePage/Home'
import ErrorsPage from './pages/PrivatePage/ErrorsPage'
import Message from './pages/PrivatePage/Message'
import PrivateRoute from './pages/checkAuth/PrivateRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkToken } from './redux/slice/authSlice'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import RoleController from './pages/checkAuth/RoleController'
import Products from './pages/PrivatePage/Products'
import Materials from './pages/PrivatePage/Materials'
import Customer from './pages/PrivatePage/Customer'
import Profile from './pages/PrivatePage/Profile'
import AccountSettings from './pages/PrivatePage/AccountSettings'

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkToken())
    }, [])
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute>
                <Layout />
            </PrivateRoute>,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/error-codes',
                    element: <RoleController>
                        <ErrorsPage />
                    </RoleController>
                },
                {
                    path: '/materials',
                    element: <RoleController>
                        <Materials />
                    </RoleController>
                },
                {
                    path: '/customers',
                    element: <RoleController>
                        <Customer />
                    </RoleController>
                },
                {
                    path: '/Products',
                    element: <RoleController>
                        <Products />
                    </RoleController>
                },
                {
                    path: '/message',
                    element: <RoleController>
                        <Message />
                    </RoleController>
                },
                {
                    path: '/profile',
                    element: <RoleController>
                        <Profile />
                    </RoleController>
                },
                {
                    path: '/account-settings',
                    element: <RoleController>
                        <AccountSettings />
                    </RoleController>
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
    ]);
    return (
        <RouterProvider router={router} />
    )
}
