import { RouterProvider } from 'react-router';
import ReactDOM from 'react-dom/client';
import { router } from './routes';
import './index.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
