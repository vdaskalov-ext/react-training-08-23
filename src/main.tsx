import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { store } from './app/redux/store';
// import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </StrictMode>
);
