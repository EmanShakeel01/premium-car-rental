export default function About() {
  const team = [
    { name: 'James Harrington', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Sofia Al-Rashid', role: 'Head of Fleet', emoji: '👩‍🔧' },
    { name: 'Marcus Chen', role: 'Customer Experience', emoji: '👨‍💻' },
    { name: 'Layla Noor', role: 'Events & Weddings', emoji: '👩‍🎨' },
  ]
  return (
    <div className="about-page">
      <div className="about-page__hero">
        <div className="container">
          <h1 className="display">About LuxeDrive</h1>
          <p>15 years of putting extraordinary vehicles in extraordinary hands.</p>
        </div>
      </div>
      <div className="container">
        <section className="about-section">
          <h2 className="display">Our Story</h2>
          <p>Founded in 2009, LuxeDrive began with a single Rolls-Royce and a simple belief: every journey deserves to be memorable. Today we operate a fleet of over 500 vehicles across the region, serving everyone from newlyweds seeking the perfect wedding car to executives who demand first-class comfort on every trip.</p>
          <p style={{ marginTop: '1rem' }}>We obsess over every detail — the smell of the leather, the polish of the chrome, the smoothness of the ride. When you step into a LuxeDrive vehicle, you step into an experience that has been thought through from first impression to final drop-off.</p>
        </section>

        <section className="about-values">
          {[
            { icon: '🏆', title: 'Excellence', desc: 'Every vehicle is maintained to manufacturer standards and inspected before each rental.' },
            { icon: '🤝', title: 'Trust', desc: 'Transparent pricing, no hidden fees. What you see is exactly what you pay.' },
            { icon: '💡', title: 'Innovation', desc: 'From EV fleets to digital booking, we stay ahead so our clients always get the best.' },
            { icon: '❤', title: 'Passion', desc: 'We are car people. Every model in our fleet was chosen because someone here loves it.' },
          ].map(v => (
            <div key={v.title} className="value-card">
              <span className="value-card__icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </section>

        <section className="about-section">
          <h2 className="display" style={{ marginBottom: '2rem' }}>Meet the Team</h2>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-card__avatar">{m.emoji}</div>
                <h3>{m.name}</h3>
                <p className="text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}