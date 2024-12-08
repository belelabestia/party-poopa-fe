import { AdminsResult, getAllAdmins } from 'api/admin';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';
import { useEffect, useState } from 'react';

export const AdminsIndex = () => {
  const [admins, setAdmins] = useState<AdminsResult>();

  const onStartup = async () => {
    const [{ error, payload }] = await Promise.all([getAllAdmins(), delay(1000)]);
    if (error) return;

    setAdmins(payload);
  };

  useEffect(() => { onStartup() }, []);

  return admins
    ? admins.map(a => <pre key={a.id}>{JSON.stringify(a)}</pre>)
    : <Loading />;
};
