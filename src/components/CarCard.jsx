import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCompare } from '../context/CompareContext'

export default function CarCard({ car }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare } = useCompare()
  const wishlisted = isWishlisted(car.id)
  const inCompare = isInCompare(car.id)

  return (
    <div className="car-card">
      <div className="car-card__img-wrap">
        <img src={car.image} alt={car.name} className="car-card__img" loading="lazy" />
        {!car.available && <span className="car-card__badge car-card__badge--unavailable">Unavailable</span>}
        {car.featured && car.available && <span className="car-card__badge car-card__badge--featured">Featured</span>}
        <button
          className={`car-card__wish${wishlisted ? ' active' : ''}`}
          onClick={() => toggleWishlist(car)}
          aria-label="Toggle wishlist"
        >
          {wishlisted ? '♥' : '♡'}
        </button>
      </div>

      <div className="car-card__body">
        <div className="car-card__category">{car.category}</div>
        <h3 className="car-card__name">{car.name}</h3>

        <div className="car-card__specs">
          <span>👤 {car.seats}</span>
          <span>⚙ {car.transmission}</span>
          <span>⛽ {car.fuel}</span>
          <span>📅 {car.year}</span>
        </div>

        <div className="car-card__footer">
          <div className="car-card__price">
            <span className="car-card__price-amount">${car.price}</span>
            <span className="car-card__price-unit"> / {car.priceUnit}</span>
          </div>
          <div className="car-card__rating">
            ★ {car.rating} <span className="text-muted">({car.reviews})</span>
          </div>
        </div>

        <div className="car-card__actions">
          <Link to={`/cars/${car.id}`} className="btn btn-primary car-card__btn">
            View Details
          </Link>
          <button
            className={`btn btn-outline car-card__btn${inCompare ? ' active' : ''}`}
            onClick={() => toggleCompare(car)}
          >
            {inCompare ? '✓ Added' : '⇄ Compare'}
          </button>
        </div>
      </div>
    </div>
  )
}