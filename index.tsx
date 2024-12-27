import { App } from './features/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from './features/auth/login';
import './styles.css';
import { Admins } from './features/admins';
import { UpdateAdmin } from './features/admins/update-admin';
import { CreateAdmin } from './features/admins/create-admin';
import { Home } from './features/home';
import { Events } from './features/events';
import { CreateEvent } from '@/events/create-event';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/home' element={<Home />} />
        <Route path='/admins' element={<Admins />} />
        <Route path='/admin/create' element={<CreateAdmin />} />
        <Route path='/admin/:id' element={<UpdateAdmin />} />
        <Route path='/events' element={<Events />} />
        <Route path='/event/create' element={<CreateEvent />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
