import { useEffect } from 'react';

const useLiveReload = () => {
  useEffect(() => {
    console.log('useLiveReload');
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
      new EventSource('/esbuild').addEventListener('change', () => {
        console.log('reload');
        window.location.reload();
      });
    }
  }, []);
};
export default useLiveReload;