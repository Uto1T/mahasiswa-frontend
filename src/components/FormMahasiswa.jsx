import { useState } from 'react';
import axios from 'axios';

function FormMahasiswa({ onDataAdded, onNotify }) {
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    alamat: '',
    tgl_lahir: '',
    jurusan: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/mahasiswa', formData);
      setFormData({ nim: '', nama: '', alamat: '', tgl_lahir: '', jurusan: '' });
      onNotify('success', 'Data mahasiswa berhasil ditambahkan!');
      onDataAdded();
    } catch (error) {
      onNotify('error', 'Gagal menambah data: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>Tambah Data Mahasiswa</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <input type="text" name="nim" placeholder="NIM (Contoh: 0123456792)" value={formData.nim} onChange={handleChange} required />
        <input type="text" name="nama" placeholder="Nama Lengkap" value={formData.nama} onChange={handleChange} required />
        <input type="text" name="alamat" placeholder="Alamat" value={formData.alamat} onChange={handleChange} required />
        <input type="date" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} required />
        <input type="text" name="jurusan" placeholder="Jurusan" value={formData.jurusan} onChange={handleChange} required />
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Menyimpan...' : 'Simpan Mahasiswa'}
        </button>
      </form>
    </div>
  );
}

export default FormMahasiswa;
