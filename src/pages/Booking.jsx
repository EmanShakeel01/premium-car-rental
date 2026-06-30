import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import cars from '../data/cars.json'

const today = new Date().toISOString().split('T')[0]

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(c => c.id === Number(id))

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pickup: '', returnDate: '', pickupLocation: '', dropLocation: '',
    message: '', agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!car) return (
    <div className="empty-state" style={{ marginTop: '6rem' }}>
      <h3>Car not found</h3>
      <Link to="/cars" className="btn btn-primary">Back to Fleet</Link>
    </div>
  )

  const days = form.pickup && form.returnDate
    ? Math.max(1, Math.ceil((new Date(form.returnDate) - new Date(form.pickup)) / 86400000))
    : 1
  const total = car.price * days

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^\+?[\d\s\-]{7,15}$/)) e.phone = 'Valid phone required'
    if (!form.pickup) e.pickup = 'Pick-up date is required'
    if (!form.returnDate) e.returnDate = 'Return date is required'
    if (form.pickup && form.returnDate && form.returnDate <= form.pickup) e.returnDate = 'Return must be after pick-up'
    if (!form.pickupLocation.trim()) e.pickupLocation = 'Pick-up location is required'
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the terms'
    return e
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="booking-success">
      <div className="booking-success__card">
        <span className="booking-success__icon">✓</span>
        <h2 className="display">Booking Confirmed!</h2>
        <p>Thank you, <strong>{form.firstName}</strong>. Your reservation for the <strong>{car.name}</strong> has been received.</p>
        <p>A confirmation will be sent to <strong>{form.email}</strong>.</p>
        <div className="booking-success__summary">
          <div><span>Vehicle</span><span>{car.name}</span></div>
          <div><span>Pick-up</span><span>{form.pickup}</span></div>
          <div><span>Return</span><span>{form.returnDate}</span></div>
          <div><span>Duration</span><span>{days} day{days > 1 ? 's' : ''}</span></div>
          <div className="total"><span>Total</span><span>${total}</span></div>
        </div>
        <div className="booking-success__actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/cars" className="btn btn-outline">Browse More Cars</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="booking-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cars">Cars</Link> / <Link to={`/cars/${car.id}`}>{car.name}</Link> / <span>Booking</span>
        </nav>

        <h1 className="display booking-page__title">Complete Your Booking</h1>

        <div className="booking-page__grid">
          {/* Form */}
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="booking-form__group">
              <legend>Personal Information</legend>
              <div className="form-row">
                <div className="form-field">
                  <label>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                  {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                </div>
                <div className="form-field">
                  <label>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                  {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-field">
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+971 50 123 4567" />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-form__group">
              <legend>Rental Details</legend>
              <div className="form-row">
                <div className="form-field">
                  <label>Pick-up Date *</label>
                  <input name="pickup" type="date" min={today} value={form.pickup} onChange={handleChange} />
                  {errors.pickup && <span className="form-error">{errors.pickup}</span>}
                </div>
                <div className="form-field">
                  <label>Return Date *</label>
                  <input name="returnDate" type="date" min={form.pickup || today} value={form.returnDate} onChange={handleChange} />
                  {errors.returnDate && <span className="form-error">{errors.returnDate}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Pick-up Location *</label>
                  <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Hotel, address or airport" />
                  {errors.pickupLocation && <span className="form-error">{errors.pickupLocation}</span>}
                </div>
                <div className="form-field">
                  <label>Drop-off Location</label>
                  <input name="dropLocation" value={form.dropLocation} onChange={handleChange} placeholder="Same as pick-up (optional)" />
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-form__group">
              <legend>Additional Notes</legend>
              <div className="form-field">
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any special requests or notes…" />
              </div>
            </fieldset>

            <label className="form-checkbox">
              <input name="agreeTerms" type="checkbox" checked={form.agreeTerms} onChange={handleChange} />
              I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
            </label>
            {errors.agreeTerms && <span className="form-error">{errors.agreeTerms}</span>}

            <button type="submit" className="btn btn-primary booking-form__submit">
              Confirm Booking — ${total}
            </button>
          </form>

          {/* Summary */}
          <aside className="booking-summary">
            <img src={car.image} alt={car.name} className="booking-summary__img" />
            <h3 className="booking-summary__name display">{car.name}</h3>
            <p className="text-muted">{car.category}</p>
            <div className="booking-summary__specs">
              <span>👤 {car.seats} seats</span>
              <span>⚙ {car.transmission}</span>
              <span>⛽ {car.fuel}</span>
            </div>
            <div className="booking-summary__price-breakdown">
              <div><span>${car.price} / day</span><span>×</span><span>{days} day{days > 1 ? 's' : ''}</span></div>
              <div className="booking-summary__total"><span>Total</span><span>${total}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}