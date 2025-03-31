import { createBrowserRouter } from 'react-router';
import { Root } from './layouts/Root';
//import { Root } from './layouts/Root';
//import { BooksList } from './pages/BooksList';
//import { BookForm } from './pages/BookForm';
import { Home } from './pages/Home';
import { BooksList } from './pages/BooksList';
import { BookForm } from './pages/BookForm';
import { PageNotFound } from './pages/PageNotFound';
import { Export } from './pages/Export';
import { Import } from './pages/Import';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'export', Component: Export },
      { path: 'import', Component: Import },
      {
        path: 'book',
        children: [
          { path: 'list', Component: BooksList },
          { path: 'edit/:bid?', Component: BookForm },
          { path: 'new', Component: BookForm }
        ]
      }
    ]
  },
  { path: '*', Component: PageNotFound } // Fallback route
]);
