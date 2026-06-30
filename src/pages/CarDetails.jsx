import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import cars from '../data/cars.json'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'
import CarCard from '../components/CarCard'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(c => c.id === Number(id))
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare } = useCompare()
  const [activeImg, setActiveImg] = useState(0)

  if (!car) {
    return (
      <div className="empty-state" style={{ marginTop: '6rem' }}>
        <span className="empty-state__icon">🚗</span>
        <h3>Car not found</h3>
        <Link to="/cars" className="btn btn-primary">Back to Fleet</Link>
      </div>
    )
  }

  const related = cars.filter(c => c.category === car.category && c.id !== car.id).slice(0, 3)

  return (
    <div className="car-details">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cars">Cars</Link> / <span>{car.name}</span>
        </nav>

        <div className="car-details__grid">
          {/* Images */}
          <div className="car-details__gallery">
            <img src={car.images[activeImg] || car.image} alt={car.name} className="car-details__main-img" />
            {car.images.length > 1 && (
              <div className="car-details__thumbs">
                {car.images.map((img, i) => (
                  <img key={i} src={img} alt="" className={`car-details__thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)} />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="car-details__info">
            <span className="car-details__category">{car.category}</span>
            <h1 className="car-details__name display">{car.name}</h1>
            <div className="car-details__meta">
              <span>★ {car.rating}</span>
              <span className="text-muted">({car.reviews} reviews)</span>
              <span className={`car-details__status ${car.available ? 'available' : 'unavailable'}`}>
                {car.available ? '✓ Available' : '✗ Unavailable'}
              </span>
            </div>

            <div className="car-details__price">
              <span className="car-details__price-main">${car.price}</span>
              <span className="text-muted"> / {car.priceUnit}</span>
            </div>

            <p className="car-details__desc">{car.description}</p>

            {/* Specs */}
            <div className="car-details__specs">
              {[
                { icon: '📅', label: 'Year', val: car.year },
                { icon: '👤', label: 'Seats', val: car.seats },
                { icon: '⚙', label: 'Transmission', val: car.transmission },
                { icon: '⛽', label: 'Fuel', val: car.fuel },
                { icon: '🔧', label: 'Engine', val: car.engine },
                { icon: '⚡', label: 'Horsepower', val: `${car.horsepower} hp` },
                { icon: '🏎', label: 'Top Speed', val: car.topSpeed },
                { icon: '🛣', label: 'Mileage', val: car.mileage },
              ].map(s => (
                <div key={s.label} className="spec-item">
                  <span className="spec-item__icon">{s.icon}</span>
                  <span className="spec-item__label">{s.label}</span>
                  <span className="spec-item__val">{s.val}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="car-details__features">
              <h3>Included Features</h3>
              <div className="features-list">
                {car.features.map(f => (
                  <span key={f} className="feature-tag">✓ {f}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="car-details__cta">
              {car.available ? (
                <button className="btn btn-primary car-details__book-btn" onClick={() => navigate(`/booking/${car.id}`)}>
                  Book Now
                </button>
              ) : (
                <button className="btn btn-primary car-details__book-btn" disabled>
                  Currently Unavailable
                </button>
              )}
              <button
                className={`btn btn-outline${isWishlisted(car.id) ? ' active' : ''}`}
                onClick={() => toggleWishlist(car)}
              >
                {isWishlisted(car.id) ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
              <button
                className={`btn btn-outline${isInCompare(car.id) ? ' active' : ''}`}
                onClick={() => toggleCompare(car)}
              >
                {isInCompare(car.id) ? '✓ In Compare' : '⇄ Compare'}
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="section">
            <div className="section__header">
              <h2 className="section__title display">Similar Vehicles</h2>
              <Link to={`/cars?category=${encodeURIComponent(car.category)}`} className="section__link">See all →</Link>
            </div>
            <div className="cars__grid">
              {related.map(c => <CarCard key={c.id} car={c} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}