import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarCard from '../components/CarCard'
import allCars from '../data/cars.json'

const categories = ['All', 'Wedding Cars', 'Luxury Cars', 'Sports Cars', 'SUVs', 'Sedans', 'Economy Cars', 'Electric Vehicles', 'Limousines', 'Vans & Minibuses']
const fuels = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric']
const transmissions = ['All', 'Automatic', 'Manual']

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [fuel, setFuel] = useState('All')
  const [transmission, setTransmission] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(1200)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = [...allCars]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some(t => t.includes(q))
      )
    }
    if (category !== 'All') list = list.filter(c => c.category === category)
    if (fuel !== 'All') list = list.filter(c => c.fuel === fuel)
    if (transmission !== 'All') list = list.filter(c => c.transmission === transmission)
    if (onlyAvailable) list = list.filter(c => c.available)
    list = list.filter(c => c.price <= maxPrice)

    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break
      case 'newest':     list.sort((a, b) => b.year - a.year); break
      case 'featured':   list.sort((a, b) => b.featured - a.featured); break
    }
    return list
  }, [search, category, fuel, transmission, sortBy, maxPrice, onlyAvailable])

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setFuel('All')
    setTransmission('All'); setSortBy('featured'); setMaxPrice(1200); setOnlyAvailable(false)
    setSearchParams({})
  }

  return (
    <div className="cars-page">
      <div className="cars-page__hero">
        <div className="container">
          <h1 className="display">Our Fleet</h1>
          <p>{filtered.length} vehicles available</p>
        </div>
      </div>

      <div className="container cars-page__body">
        {/* Sidebar filters */}
        <aside className="filters">
          <div className="filters__header">
            <h3>Filters</h3>
            <button className="filters__clear" onClick={clearFilters}>Clear all</button>
          </div>

          <div className="filters__section">
            <label className="filters__label">Search</label>
            <input
              className="filters__input"
              type="text"
              placeholder="Brand, model…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filters__section">
            <label className="filters__label">Category</label>
            {categories.map(c => (
              <label key={c} className="filters__radio">
                <input type="radio" name="category" checked={category === c} onChange={() => setCategory(c)} />
                {c}
              </label>
            ))}
          </div>

          <div className="filters__section">
            <label className="filters__label">Fuel Type</label>
            {fuels.map(f => (
              <label key={f} className="filters__radio">
                <input type="radio" name="fuel" checked={fuel === f} onChange={() => setFuel(f)} />
                {f}
              </label>
            ))}
          </div>

          <div className="filters__section">
            <label className="filters__label">Transmission</label>
            {transmissions.map(t => (
              <label key={t} className="filters__radio">
                <input type="radio" name="trans" checked={transmission === t} onChange={() => setTransmission(t)} />
                {t}
              </label>
            ))}
          </div>

          <div className="filters__section">
            <label className="filters__label">Max Price: <strong>${maxPrice}/day</strong></label>
            <input
              type="range" min="45" max="1200" step="5"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="filters__range"
            />
          </div>

          <div className="filters__section">
            <label className="filters__radio">
              <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} />
              Available only
            </label>
          </div>
        </aside>

        {/* Main content */}
        <div className="cars-page__main">
          <div className="cars-page__toolbar">
            <span className="text-muted">{filtered.length} results</span>
            <select className="filters__select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-grid">
              {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">🚗</span>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="cars__grid">
              {filtered.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}