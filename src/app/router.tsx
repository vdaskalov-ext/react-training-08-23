import {lazy} from 'react';
import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';
import {AppContainer} from './components/app-container';
import {AuthContextProvider} from './components/auth/auth-context';
import {withAuthGuard} from './components/auth/auth-guard';
import {CustomThemeProvider} from './components/theme-provider';

import Home from './pages/home';
import {ErrorBoundary} from "./components/error-boundary"; // initial page is embedded

const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const NotFound = lazy(() => import('./pages/not-found'));
const PlanetDetails = lazy(() => import('./pages/planet-details'));
const IssuesTracker = lazy(() => import('./issue/components/issues-tracker'));
const Notes = lazy(() => import('./pages/notes'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthContextProvider>
                <CustomThemeProvider>
                    <Outlet/>
                </CustomThemeProvider>
            </AuthContextProvider>
        ),
        children: [
            {
                path: '/',
                element: withAuthGuard(<AppContainer/>),
                children: [
                    {index: true, element: <Navigate to="/home"/>},
                    {path: '/home', element: <Home/>},
                    {path: 'planets/:id', element: <PlanetDetails/>},
                    {path: '/forbidden', element: <div>Hey, you are logged in!</div>},
                    {path: '/issues', element: <IssuesTracker/>},
                    {path: '/notes', element: <Notes/>},
                ],
            },
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
        ],
    },
    {path: '/public', element: <Home/>},
    {path: '/public-notes', element: <Notes/>},
    {path: '*', element: <NotFound/>},
]);
