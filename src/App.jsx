import { useState } from 'react'
import './App.css'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    car: <><path d="M5 17h14l-1-5-3-3H9l-3 3-1 5Z"/><path d="M7 17v2M17 17v2M6 13h12"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    close: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    money: <><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20M6 15h3"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/>,
    star: <path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.2L12 16.3 6.4 19.5l1.1-6.2L3 8.9 9 8l3-6Z"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const rides = [
  { name: 'Maya Chen', initials: 'MC', time: '8 min', distance: '2.4 mi', price: '$18.50', rating: '4.9', seats: 2, color: '#e8d5ff', car: 'Toyota Corolla', plate: 'KJ 284', accent: '#7657d6' },
  { name: 'Jordan Lee', initials: 'JL', time: '12 min', distance: '3.1 mi', price: '$15.90', rating: '4.8', seats: 1, color: '#d8f2ea', car: 'Honda Civic', plate: 'LR 902', accent: '#16866f' },
  { name: 'Sofia Davis', initials: 'SD', time: '17 min', distance: '4.6 mi', price: '$14.20', rating: '5.0', seats: 3, color: '#ffe0d2', car: 'Mazda 3', plate: 'MR 417', accent: '#e36b42' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookedRide, setBookedRide] = useState(null)
  const [activeTab, setActiveTab] = useState('Find a ride')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const bookRide = (ride) => {
    setBookedRide(ride)
    setMenuOpen(false)
  }

  const navItems = [
    { label: 'Find a ride', icon: 'search' },
    { label: 'My rides', icon: 'car' },
    { label: 'Messages', icon: 'heart' },
    { label: 'Saved', icon: 'shield' },
  ]

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="SwiftRide home">
          <span className="brand-mark"><span /></span>
          <span>swift<span>ride</span></span>
        </a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.label} className={activeTab === item.label ? 'active' : ''} onClick={() => { setActiveTab(item.label); setMenuOpen(false) }}>
              <Icon name={item.icon} size={17} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button notification" aria-label="Notifications"><Icon name="bell" /><span /></button>
          <button className="profile-button" aria-label="Open profile"><span>AR</span><span className="profile-copy"><b>Alex Rivera</b><small>Rider</small></span><Icon name="chevron" size={15} /></button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Icon name="spark" size={16} /> Shared journeys, made simple</div>
            <h1>Good rides.<br /><em>Better days.</em></h1>
            <p>Share the way, cut your costs, and get where you’re going with people you can trust.</p>
            <div className="hero-stats">
              <div><strong>12k+</strong><span>happy riders</span></div>
              <div><strong>4.9</strong><span>average rating</span></div>
              <div><strong>23%</strong><span>saved on trips</span></div>
            </div>
          </div>

          <div className="search-card">
            <div className="search-heading"><span>Where to?</span><span className="step">1 of 2</span></div>
            <div className="search-field">
              <span className="field-icon pickup"><Icon name="pin" /></span>
              <div><small>Pickup location</small><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter your location" aria-label="Pickup location" /></div>
            </div>
            <div className="search-field destination">
              <span className="field-icon destination"><Icon name="pin" /></span>
              <div><small>Destination</small><input placeholder="Where are you headed?" aria-label="Destination" /></div>
            </div>
            <div className="search-options">
              <label><Icon name="calendar" size={17} /><span><small>When</small><b>Today, 6:30 PM</b></span></label>
              <label><Icon name="users" size={17} /><span><small>Seats</small><b>1 passenger</b></span></label>
              <label><Icon name="money" size={17} /><span><small>Budget</small><b>$25 max</b></span></label>
            </div>
            <button className="search-button" onClick={() => document.getElementById('rides')?.scrollIntoView({ behavior: 'smooth' })}><Icon name="search" /> Find your ride <Icon name="arrow" /></button>
          </div>
        </section>

        <section className="trust-strip">
          <span>Trusted by commuters at</span>
          <div><b>←</b> CITYFLOW</div><div><b>◈</b> RIDEWISE</div><div><b>✦</b> COMMON</div><div><b>●</b> WAYPOINT</div>
        </section>

        <section className="section rides-section" id="rides">
          <div className="section-heading">
            <div><span className="section-kicker">Rides near you</span><h2>Ready when you are.</h2><p>Friendly drivers, fair prices, and a little less traffic.</p></div>
            <button className="text-button" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'View all rides'} <Icon name="arrow" size={17} /></button>
          </div>
          <div className="ride-grid">
            {rides.slice(0, showAll ? rides.length : 2).map((ride) => (
              <article className="ride-card" key={ride.name}>
                <div className="card-top">
                  <div className="driver-avatar" style={{ background: ride.color, color: ride.accent }}>{ride.initials}</div>
                  <div className="driver-info"><h3>{ride.name}</h3><p><Icon name="star" size={14} /> {ride.rating} · 128 trips</p></div>
                  <button className="save-button" aria-label={`Save ${ride.name}'s ride`}><Icon name="heart" size={18} /></button>
                </div>
                <div className="route-row">
                  <div><span className="route-dot start" /><strong>Now</strong><small>{ride.time} away</small></div>
                  <div className="route-line"><span /></div>
                  <div><span className="route-dot end" /><strong>6:30 PM</strong><small>{ride.distance}</small></div>
                </div>
                <div className="ride-meta">
                  <div><Icon name="car" size={18} /><span><small>Vehicle</small><b>{ride.car}</b></span></div>
                  <div><Icon name="users" size={18} /><span><small>Seats</small><b>{ride.seats} left</b></span></div>
                  <div><Icon name="shield" size={18} /><span><small>Verified</small><b>Driver</b></span></div>
                </div>
                <div className="card-footer"><span><small>From</small><b>{ride.price}</b></span><button onClick={() => bookRide(ride)}>Book ride <Icon name="arrow" size={17} /></button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section">
          <div className="how-visual">
            <div className="map-card">
              <div className="map-grid" />
              <svg className="route-map" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true"><path className="map-road" d="M-20 245 C87 233 92 110 166 122 S267 251 329 173 S421 50 550 72"/><path className="map-road secondary" d="M-20 80 C95 128 98 225 185 200 S362 67 550 112"/><path className="map-road secondary" d="M120 -30 C154 93 238 99 252 330"/></svg>
              <div className="map-pin start"><Icon name="pin" size={18} /></div><div className="map-pin end"><Icon name="pin" size={18} /></div>
              <div className="car-marker"><Icon name="car" size={22} /></div>
              <div className="map-card-label"><span>Route safe</span><strong>4.2 mi</strong></div>
            </div>
            <div className="floating-badge"><span><Icon name="shield" /></span><div><b>Ride protected</b><small>100% verified journeys</small></div></div>
          </div>
          <div className="how-copy"><span className="section-kicker">Why SwiftRide</span><h2>Moving forward<br />together.</h2><p>We make sharing a ride feel effortless—from finding the right person to getting safely there.</p>
            <div className="benefits">
              <div><span><Icon name="search" /></span><p><b>Find your fit</b><small>Filter by route, schedule, and what matters to you.</small></p></div>
              <div><span><Icon name="shield" /></span><p><b>Ride with confidence</b><small>Verified profiles, ratings, and protected payments.</small></p></div>
              <div><span><Icon name="spark" /></span><p><b>Make it yours</b><small>Share the journey and save more on every trip.</small></p></div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div><span>Ready for a better ride?</span><h2>Let’s get you there.</h2></div>
          <button onClick={() => document.getElementById('rides')?.scrollIntoView({ behavior: 'smooth' })}>Find a ride <Icon name="arrow" /></button>
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /></span><span>swift<span>ride</span></span></a><p>Smarter journeys. Softer commutes.</p><div><a href="#rides">How it works</a><a href="#rides">Safety</a><a href="#rides">Support</a></div></footer>

      {bookedRide && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setBookedRide(null)}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setBookedRide(null)} aria-label="Close"><Icon name="close" /></button>
            <div className="success-icon"><Icon name="check" size={35} /></div>
            <span className="section-kicker">Ride confirmed</span>
            <h2 id="booking-title">You’re all set!</h2>
            <p>Meet {bookedRide.name} at the pickup point in approximately {bookedRide.time}.</p>
            <div className="modal-driver"><div className="driver-avatar" style={{ background: bookedRide.color, color: bookedRide.accent }}>{bookedRide.initials}</div><div><b>{bookedRide.name}</b><span><Icon name="star" size={14} /> {bookedRide.rating} · {bookedRide.car}</span></div><strong>{bookedRide.price}</strong></div>
            <div className="modal-route"><div><span className="route-dot start" /><b>Pickup</b><small>123 Market Street</small></div><div><span className="route-dot end" /><b>Destination</b><small>University Avenue</small></div></div>
            <button className="modal-action" onClick={() => setBookedRide(null)}>View my ride <Icon name="arrow" /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
