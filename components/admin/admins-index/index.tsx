import { AdminsResult, getAllAdmins } from 'api/admin';
import { useEffect, useState } from 'react';

export const AdminsIndex = () => {
  const [admins, setAdmins] = useState<AdminsResult>();

  const onStartup = async () => {
    const { error, payload } = await getAllAdmins();
    if (error) return;
  
    setAdmins(payload);
  };

  useEffect(() => { onStartup() }, []);

  return admins
    ? admins.map(a => <pre>{JSON.stringify(a)}</pre>)
    : <p>loading...</p>
};
