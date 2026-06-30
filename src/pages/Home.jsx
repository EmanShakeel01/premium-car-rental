import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarCard from '../components/CarCard'
import cars from '../data/cars.json'

const categories = [
  { label: 'Wedding Cars', image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=400&q=80' },
  { label: 'Luxury Cars', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80' },
  { label: 'Sports Cars', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80' },
  { label: 'SUVs', image: 'https://images.unsplash.com/photo-1519752594763-2633d8d4ea29?w=400&q=80' },
  { label: 'Sedans', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80' },
  { label: 'Economy Cars', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&q=80' },
  { label: 'Electric Vehicles', image: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=400&q=80' },
  { label: 'Limousines', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80' },
  { label: 'Vans & Minibuses', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80' },
]

const stats = [
  { value: '500+', label: 'Premium Vehicles' },
  { value: '10K+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
  { value: '15+', label: 'Years Experience' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const navigate = useNavigate()

  const featured = cars.filter(c => c.featured && c.available).slice(0, 6)

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (pickupDate) params.set('pickup', pickupDate)
    if (returnDate) params.set('return', returnDate)
    navigate(`/cars?${params.toString()}`)
  }

  return (
    <div className="home">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <p className="hero__eyebrow">Premium Car Rentals</p>
          <h1 className="hero__headline display">
            Drive the Car<br />
            <span className="text-gold">You Deserve</span>
          </h1>
          <p className="hero__sub">
            From vintage wedding cars to electric supercars — every journey starts with the right vehicle.
          </p>

          {/* Search bar */}
          <form className="hero__search" onSubmit={handleSearch}>
            <div className="hero__search-field">
              <label>Search</label>
              <input
                type="text"
                placeholder="Car name, brand, category…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="hero__search-field">
              <label>Pick-up Date</label>
              <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
            </div>
            <div className="hero__search-field">
              <label>Return Date</label>
              <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary hero__search-btn">
              Search Cars
            </button>
          </form>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map(s => (
            <div key={s.label} className="stats__item">
              <span className="stats__value display text-gold">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title display">Browse by Category</h2>
            <Link to="/cars" className="section__link">View all →</Link>
          </div>
          <div className="categories__grid">
            {categories.map(cat => (
              <Link
                key={cat.label}
                to={`/cars?category=${encodeURIComponent(cat.label)}`}
                className="category-card"
              >
                <div className="category-card__img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="category-card__img"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80' }}
                  />
                </div>
                <span className="category-card__label">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Cars ────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title display">Featured Vehicles</h2>
            <Link to="/cars" className="section__link">See all →</Link>
          </div>
          <div className="cars__grid">
            {featured.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      {/* ── Wedding Banner ───────────────────────── */}
      <section className="wedding-banner">
        <div className="container wedding-banner__inner">
          <div className="wedding-banner__text">
            <p className="hero__eyebrow">Special Collection</p>
            <h2 className="display">Wedding Car Collection</h2>
            <p>Make your special day unforgettable. Browse our curated fleet of vintage classics, Rolls-Royces, Bentleys, and stretch limousines — each prepared to perfection.</p>
            <Link to="/cars?category=Wedding Cars" className="btn btn-primary">
              Explore Wedding Cars
            </Link>
          </div>
          <div className="wedding-banner__img">
            <img
              src="https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80"
              alt="Wedding car"
            />
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2 className="section__title display" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Why Choose LuxeDrive?
          </h2>
          <div className="why__grid">
            {[
              { icon: '🔑', title: 'Instant Booking', desc: 'Reserve your car in under 2 minutes. No paperwork, no waiting.' },
              { icon: '🛡', title: 'Fully Insured', desc: 'Every vehicle is comprehensively insured for your peace of mind.' },
              { icon: '📍', title: 'Free Delivery', desc: 'We deliver and collect from your location — hotel, home, or airport.' },
              { icon: '⭐', title: 'Top-Rated Fleet', desc: 'Every car is regularly inspected and maintained to showroom standard.' },
            ].map(item => (
              <div key={item.title} className="why-card">
                <span className="why-card__icon">{item.icon}</span>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}