import { RouterProvider } from 'react-router';
import ReactDOM from 'react-dom/client';
import { router } from './routes';
import './index.css';
import AlertProvider from './providers/AlertProvider';
import AlertDialog from './components/AlertDialog';
import { StrictMode } from 'react';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AlertProvider AlertComponent={AlertDialog}>
      <RouterProvider router={router} />
    </AlertProvider>
  </StrictMode>
);
