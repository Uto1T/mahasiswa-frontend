import axios from 'axios';

function TabelMahasiswa({ dataMahasiswa, loading, onDataDeleted, onNotify }) {
  const handleDelete = async (nim) => {
    if (!window.confirm(`Yakin ingin menghapus mahasiswa dengan NIM ${nim}?`)) return;

    try {
      await axios.delete(`http://localhost:5000/mahasiswa/${nim}`);
      onNotify('success', `Data mahasiswa dengan NIM ${nim} berhasil dihapus!`);
      onDataDeleted();
    } catch (error) {
      onNotify('error', 'Gagal menghapus data: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatTanggal = (tgl) => {
    if (!tgl) return '-';
    return String(tgl).slice(0, 10); // Memastikan format bersih YYYY-MM-DD
  };

  return (
    <div className="card">
      <h3>Daftar Mahasiswa</h3>
      {loading ? (
        <p className="loading-text">Memuat data mahasiswa...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Tanggal Lahir</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataMahasiswa.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#64748b' }}>
                    Belum ada data mahasiswa.
                  </td>
                </tr>
              ) : (
                dataMahasiswa.map((mhs) => (
                  <tr key={mhs.nim}>
                    <td>{mhs.nim}</td>
                    <td>{mhs.nama}</td>
                    <td>{mhs.alamat}</td>
                    <td>{formatTanggal(mhs.tgl_lahir)}</td>
                    <td>{mhs.jurusan}</td>
                    <td>
                      <button onClick={() => handleDelete(mhs.nim)} className="btn-danger">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TabelMahasiswa;