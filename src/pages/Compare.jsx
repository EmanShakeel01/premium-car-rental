import { Link } from 'react-router-dom'
import { useCompare } from '../context/CompareContext'

const specKeys = [
  { label: 'Category', key: 'category' },
  { label: 'Year', key: 'year' },
  { label: 'Engine', key: 'engine' },
  { label: 'Horsepower', key: 'horsepower', suffix: ' hp' },
  { label: 'Top Speed', key: 'topSpeed' },
  { label: 'Seats', key: 'seats' },
  { label: 'Fuel', key: 'fuel' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Mileage', key: 'mileage' },
  { label: 'Price / Day', key: 'price', prefix: '$' },
]

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  if (compareList.length === 0) return (
    <div className="empty-state" style={{ marginTop: '6rem' }}>
      <span className="empty-state__icon">⇄</span>
      <h3>No cars selected to compare</h3>
      <p>Add up to 3 cars from the fleet to compare side by side.</p>
      <Link to="/cars" className="btn btn-primary">Browse Cars</Link>
    </div>
  )

  return (
    <div className="container compare-page">
      <div className="compare-page__header">
        <h1 className="display">Compare Vehicles</h1>
        <button className="btn btn-outline" onClick={clearCompare}>Clear All</button>
      </div>

      <div className="compare-table">
        <div className="compare-table__row compare-table__header">
          <div className="compare-table__label">Vehicle</div>
          {compareList.map(car => (
            <div key={car.id} className="compare-table__cell">
              <img src={car.image} alt={car.name} />
              <strong>{car.name}</strong>
              <button className="compare-remove" onClick={() => removeFromCompare(car.id)}>✕ Remove</button>
            </div>
          ))}
        </div>

        {specKeys.map(spec => (
          <div key={spec.key} className="compare-table__row">
            <div className="compare-table__label">{spec.label}</div>
            {compareList.map(car => (
              <div key={car.id} className="compare-table__cell">
                {spec.prefix || ''}{car[spec.key]}{spec.suffix || ''}
              </div>
            ))}
          </div>
        ))}

        <div className="compare-table__row">
          <div className="compare-table__label">Features</div>
          {compareList.map(car => (
            <div key={car.id} className="compare-table__cell compare-table__features">
              {car.features.map(f => <span key={f} className="feature-tag">✓ {f}</span>)}
            </div>
          ))}
        </div>

        <div className="compare-table__row">
          <div className="compare-table__label" />
          {compareList.map(car => (
            <div key={car.id} className="compare-table__cell">
              <Link to={`/booking/${car.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}