import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const ev = validate()
    if (Object.keys(ev).length) { setErrors(ev); return }
    setSent(true)
  }

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <div className="container">
          <h1 className="display">Get in Touch</h1>
          <p>We're here 24/7 — reach out any time.</p>
        </div>
      </div>
      <div className="container contact-page__body">
        <div className="contact-info">
          {[
            { icon: '📍', title: 'Address', val: '123 Luxury Lane, Dubai, UAE' },
            { icon: '📞', title: 'Phone', val: '+971 50 123 4567' },
            { icon: '✉', title: 'Email', val: 'hello@luxedrive.com' },
            { icon: '🕐', title: 'Hours', val: '24 / 7 — always available' },
          ].map(i => (
            <div key={i.title} className="contact-info__item">
              <span className="contact-info__icon">{i.icon}</span>
              <div>
                <strong>{i.title}</strong>
                <p>{i.val}</p>
              </div>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="booking-success__card" style={{ flex: 1 }}>
            <span className="booking-success__icon">✓</span>
            <h2 className="display">Message Sent!</h2>
            <p>Thank you for reaching out. We'll get back to you within a few hours.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2 className="display">Send a Message</h2>
            <div className="form-row">
              <div className="form-field">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-field">
              <label>Subject *</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>
            <div className="form-field">
              <label>Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us more…" />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        )}
      </div>
    </div>
  )
}