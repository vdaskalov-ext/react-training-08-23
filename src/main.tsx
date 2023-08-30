import {StrictMode, Suspense} from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {RouterProvider} from 'react-router-dom';
import {router} from './app/router';
import {store} from './app/redux/store';
import {initI18n} from "./app/i18n";
import {ErrorBoundary} from "./app/components/error-boundary";
// import App from './app/app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

initI18n();

root.render(
    <StrictMode>
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </Suspense>
        </ErrorBoundary>
    </StrictMode>
);
