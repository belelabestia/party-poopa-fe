import { App } from './features/app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from './features/auth/login';
import { Admins } from './features/admins';
import { UpdateAdmin } from './features/admins/update-admin';
import { CreateAdmin } from './features/admins/create-admin';
import { Home } from './features/home';
import { Events } from './features/events';
import { CreateEvent } from '@/events/create-event';
import { UpdateEvent } from '@/events/update-event';
import './styles.css';
import { People } from '@/people';
import { CreatePerson } from '@/people/create-person';
import { UpdatePerson } from '@/people/update-person';

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
        <Route path='/event/:id' element={<UpdateEvent />} />
        <Route path='/people' element={<People />} />
        <Route path='/person/create' element={<CreatePerson />} />
        <Route path='/person/:id' element={<UpdatePerson />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
