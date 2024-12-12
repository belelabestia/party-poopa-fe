import { App } from 'components/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from 'components/login';
import './styles.css';
import { AdminIndex } from 'components/admin/admin-index';
import { UpdateAdmin } from 'components/admin/update-admin';
import { CreateAdmin } from 'components/admin/create-admin';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/admin' element={<AdminIndex />} />
        <Route path='/admin/new' element={<CreateAdmin />} />
        <Route path='/admin/:id' element={<UpdateAdmin />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
