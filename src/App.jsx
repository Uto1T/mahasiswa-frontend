import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FormMahasiswa from './components/FormMahasiswa';
import TabelMahasiswa from './components/TabelMahasiswa';
import './App.css';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(null);

  const showNotif = useCallback((type, message) => {
    setNotif({ type, message });
    setTimeout(() => setNotif(null), 4000);
  }, []);

  const fetchMahasiswa = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/mahasiswa');
      setMahasiswa(response.data);
    } catch (error) {
      showNotif('error', 'Gagal terhubung ke server backend.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [showNotif]);

  useEffect(() => {
    let isMounted = true;

    axios.get('http://localhost:5000/mahasiswa')
      .then((response) => {
        if (isMounted) {
          setMahasiswa(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          showNotif('error', 'Gagal terhubung ke server backend.');
          setLoading(false);
        }
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, [showNotif]);

  return (
    <div className="container">
      <div className="header">
        <h1>Sistem Manajemen Data Mahasiswa</h1>
      </div>

      {notif && (
        <div className={`alert ${notif.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {notif.message}
        </div>
      )}

      <div className="layout-grid">
        <FormMahasiswa onDataAdded={fetchMahasiswa} onNotify={showNotif} />
        <TabelMahasiswa
          dataMahasiswa={mahasiswa}
          loading={loading}
          onDataDeleted={fetchMahasiswa}
          onNotify={showNotif}
        />
      </div>
    </div>
  );
}

export default App;