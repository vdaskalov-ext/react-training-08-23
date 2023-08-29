import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';
import {FC, lazy, PropsWithChildren, ReactNode} from "react";
import {AuthContextProvider,} from "./components/auth/auth-context";
import {withAuthGuard} from "./components/auth/auth-guard";
import {AppContainer} from "./components/app-container";
import {CustomThemeProvider} from "./components/theme-provider";

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const NotFound = lazy(() => import('./pages/not-found'));
const PlanetDetails = lazy(() => import('./pages/planet-details'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthContextProvider>
            <CustomThemeProvider>
                <Outlet/>
            </CustomThemeProvider>
        </AuthContextProvider>,
        children: [
            {
                path: '/', element: withAuthGuard(<AppContainer/>), children: [
                    {index: true, element: <Navigate to="/home"/>},
                    {path: '/home', element: <Home/>},
                    {path: 'planets/:id', element: <PlanetDetails/>},
                    {path: '/forbidden', element: <div>Hey, you are logged in!</div>},
                ]
            },
            {path: 'login', element: <Login/>},
        ]
    },
    {path: '/public', element: <Home/>},
    {path: '*', element: <NotFound/>},
])
