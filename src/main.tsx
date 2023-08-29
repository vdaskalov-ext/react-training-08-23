import {FC, PropsWithChildren, StrictMode, Suspense, useMemo} from 'react';
import * as ReactDOM from 'react-dom/client';

import {App} from './app/app';
import {RouterProvider} from 'react-router-dom';
import {router} from "./app/router";
import {createTheme, ThemeProvider} from "@mui/material";
// import App from './app/app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router}/>
        </Suspense>
    </StrictMode>
);
