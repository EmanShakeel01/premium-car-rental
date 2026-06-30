import { useState } from 'react'
import carsData from '../data/cars.json'

const emptyForm = {
  name: '', brand: '', category: 'Luxury Cars', price: '', year: '',
  seats: '', transmission: 'Automatic', fuel: 'Petrol', color: '',
  image: '', description: '', available: true, featured: false,
}

export default function Admin() {
  const [cars, setCars] = useState(carsData)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [view, setView] = useState('list') // 'list' | 'form'
  const [search, setSearch] = useState('')

  const filtered = cars.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleEdit = (car) => {
    setForm({ ...car })
    setEditId(car.id)
    setView('form')
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this car from the listing?')) {
      setCars(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleToggleAvailable = (id) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, available: !c.available } : c))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (editId) {
      setCars(prev => prev.map(c => c.id === editId ? { ...form, id: editId, rating: c.rating, reviews: c.reviews, images: c.images || [form.image], tags: c.tags || [] } : c))
    } else {
      const newCar = { ...form, id: Date.now(), price: Number(form.price), year: Number(form.year), seats: Number(form.seats), rating: 4.5, reviews: 0, images: [form.image], tags: [], mileage: 'Unlimited' }
      setCars(prev => [newCar, ...prev])
    }
    setForm(emptyForm)
    setEditId(null)
    setView('list')
  }

  const categories = ['Wedding Cars', 'Luxury Cars', 'Sports Cars', 'SUVs', 'Sedans', 'Economy Cars', 'Electric Vehicles', 'Limousines', 'Vans & Minibuses']

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div className="container admin-page__header-inner">
          <h1 className="display">Admin Dashboard</h1>
          <div className="admin-page__header-actions">
            <span className="admin-stat">{cars.length} total cars</span>
            <span className="admin-stat">{cars.filter(c => c.available).length} available</span>
            <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setView('form') }}>
              + Add New Car
            </button>
          </div>
        </div>
      </div>

      <div className="container admin-page__body">
        {view === 'form' ? (
          <div className="admin-form-wrap">
            <div className="admin-form-header">
              <h2 className="display">{editId ? 'Edit Car' : 'Add New Car'}</h2>
              <button className="btn btn-outline" onClick={() => setView('list')}>← Back to List</button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field"><label>Car Name *</label><input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Rolls-Royce Phantom" /></div>
                <div className="form-field"><label>Brand *</label><input name="brand" value={form.brand} onChange={handleChange} required placeholder="e.g. Rolls-Royce" /></div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-field"><label>Price / Day ($) *</label><input name="price" type="number" value={form.price} onChange={handleChange} required min="1" /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>Year *</label><input name="year" type="number" value={form.year} onChange={handleChange} required min="1900" max="2030" /></div>
                <div className="form-field"><label>Seats *</label><input name="seats" type="number" value={form.seats} onChange={handleChange} required min="1" /></div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Transmission</label>
                  <select name="transmission" value={form.transmission} onChange={handleChange}>
                    <option>Automatic</option><option>Manual</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Fuel</label>
                  <select name="fuel" value={form.fuel} onChange={handleChange}>
                    <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
                  </select>
                </div>
              </div>
              <div className="form-field"><label>Color</label><input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Midnight Black" /></div>
              <div className="form-field"><label>Image URL</label><input name="image" value={form.image} onChange={handleChange} placeholder="https://..." /></div>
              <div className="form-field"><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} /></div>
              <div className="form-row">
                <label className="form-checkbox"><input name="available" type="checkbox" checked={form.available} onChange={handleChange} /> Available for rental</label>
                <label className="form-checkbox"><input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} /> Featured on homepage</label>
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">{editId ? 'Save Changes' : 'Add Car'}</button>
                <button type="button" className="btn btn-outline" onClick={() => setView('list')}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="admin-toolbar">
              <input className="filters__input" placeholder="Search cars…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(car => (
                    <tr key={car.id}>
                      <td><img src={car.image} alt={car.name} className="admin-table__img" /></td>
                      <td><strong>{car.name}</strong><br /><span className="text-muted">{car.brand} · {car.year}</span></td>
                      <td>{car.category}</td>
                      <td>${car.price}/day</td>
                      <td>
                        <button
                          className={`admin-status-btn ${car.available ? 'available' : 'unavailable'}`}
                          onClick={() => handleToggleAvailable(car.id)}
                        >
                          {car.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button className="btn btn-outline" onClick={() => handleEdit(car)}>Edit</button>
                          <button className="btn" style={{ color: '#e55' }} onClick={() => handleDelete(car.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}