import { App } from 'components/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from 'components/login';
import './styles.css';
import { Admins } from 'components/admin/admins';
import { UpdateAdmin } from 'components/admin/update-admin';
import { CreateAdmin } from 'components/admin/create-admin';
import { Home } from 'components/home';
import { Events } from 'components/events';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/admins' element={<Admins />} />
        <Route path='/admin/create' element={<CreateAdmin />} />
        <Route path='/admin/:id' element={<UpdateAdmin />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
