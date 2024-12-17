import { App } from 'components/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from 'components/login';
import './styles.css';
import { Admins } from 'components/admins';
import { UpdateAdmin } from 'components/update-admin';
import { CreateAdmin } from 'components/create-admin';
import { Home } from 'components/home';
import { People } from 'components/people';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/home' element={<Home />} />
        <Route path='/events' element={<People />} />
        <Route path='/admins' element={<Admins />} />
        <Route path='/admin/create' element={<CreateAdmin />} />
        <Route path='/admin/:id' element={<UpdateAdmin />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
