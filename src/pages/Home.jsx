import { useRef, useState } from 'react'
import BookingModal from '../components/BookingModal'
import Icon from '../components/Icon'
import RideCard from '../components/RideCard'
import '../components/App.css'

const rides = [
  { name: 'Maya Chen', initials: 'MC', time: '8 min', distance: '2.4 mi', price: '$18.50', rating: '4.9', seats: 2, color: '#e8d5ff', car: 'Toyota Corolla', accent: '#7657d6' },
  { name: 'Jordan Lee', initials: 'JL', time: '12 min', distance: '3.1 mi', price: '$15.90', rating: '4.8', seats: 1, color: '#d8f2ea', car: 'Honda Civic', accent: '#16866f' },
  { name: 'Sofia Davis', initials: 'SD', time: '17 min', distance: '4.6 mi', price: '$14.20', rating: '5.0', seats: 3, color: '#ffe0d2', car: 'Mazda 3', accent: '#e36b42' },
]

const services = [
  { name: 'Ride', icon: 'directions_car', time: '3 min', active: true },
  { name: 'Comfort', icon: 'airline_seat_recline_extra', time: '5 min' },
  { name: 'XL Van', icon: 'airport_shuttle', time: '7 min' },
  { name: 'Moto', icon: 'two_wheeler', time: '2 min' },
  { name: 'Delivery', icon: 'package_2', time: 'Instant' },
]

const recentPlaces = [
  { name: 'Home', address: '12 Oak Street, Westside', icon: 'home', color: 'primary' },
  { name: 'Work', address: 'Downtown Tech Hub, Tower 2', icon: 'apartment', color: 'secondary' },
  { name: 'Mall', address: '88 Market St, Central Plaza', icon: 'localMall', color: 'tertiary' },
]

const navItems = [
  { label: 'Home', icon: 'home' },
  { label: 'Activity', icon: 'schedule' },
  { label: 'Wallet', icon: 'wallet' },
  { label: 'Profile', icon: 'person' },
]

const Home = ({ onChooseRide, bookedRide, onCloseBooking }) => {
  const [activeService, setActiveService] = useState('Ride')
  const [activeNav, setActiveNav] = useState('Home')
  const [destination, setDestination] = useState('')
  const [promoClaimed, setPromoClaimed] = useState(false)
  const [savedRides, setSavedRides] = useState([])
  const ridesSectionRef = useRef(null)

  const selectDestination = (place) => {
    setDestination(place.address)
    ridesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="swiftride-app">
      <header className="app-header">
        <div className="app-header__brand">
          <img src="/Assets/swiftride_logo/logo.png" alt="SwiftRide" className="app-logo" />
          <span>SwiftRide</span>
        </div>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.label} type="button" className={activeNav === item.label ? 'desktop-nav__item active' : 'desktop-nav__item'} onClick={() => setActiveNav(item.label)} aria-current={activeNav === item.label ? 'page' : undefined}>
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="app-header__actions">
          <button className="icon-button notification-button" type="button" aria-label="Notifications">
            <Icon name="bell" size={22} />
            <span className="notification-dot" />
          </button>
          <button className="profile-button" type="button" aria-label="Open profile"><span>AR</span></button>
        </div>
      </header>

      <main className="home-content">
        <section className="welcome-section" aria-labelledby="welcome-title">
          <div>
            <div className="live-status"><span className="live-status__dot" /> Swift Direct Active</div>
            <h1 id="welcome-title">Good morning,<br />Sarah</h1>
            <p>Where are you heading today?</p>
          </div>
          <div className="electric-badge" aria-label="Electric ride available"><Icon name="spark" size={27} /></div>
        </section>

        <section className="search-card" aria-label="Find a ride">
          <div className="search-card__heading"><h2>Where to?</h2><span>1 of 2</span></div>
          <button className="search-field" type="button" onClick={onChooseRide}>
            <span className="search-field__icon search-field__icon--pickup"><Icon name="pin" size={20} /></span>
            <span className="search-field__copy"><small>Pickup location</small><strong>742 Evergreen Terrace</strong></span>
            <Icon name="chevron" size={18} />
          </button>
          <button className="search-field search-field--destination" type="button" onClick={onChooseRide}>
            <span className="search-field__icon search-field__icon--destination"><Icon name="pin" size={20} /></span>
            <span className="search-field__copy"><small>Destination</small><strong>{destination || 'Where are you headed?'}</strong></span>
            <Icon name="chevron" size={18} />
          </button>
          <div className="search-options">
            <div><Icon name="calendar" size={17} /><span><small>When</small><strong>Today, 6:30 PM</strong></span></div>
            <div><Icon name="users" size={17} /><span><small>Seats</small><strong>1 passenger</strong></span></div>
            <div><Icon name="money" size={17} /><span><small>Budget</small><strong>$25 max</strong></span></div>
          </div>
          <button className="search-button" type="button" onClick={onChooseRide}><Icon name="search" size={20} /> Find your ride <Icon name="arrow" size={20} /></button>
        </section>

        <section className="services-section" aria-labelledby="services-title">
          <div className="section-heading section-heading--compact">
            <div><span className="section-kicker">Choose a ride</span><h2 id="services-title">Services</h2></div>
            <button className="text-button" type="button">See all <Icon name="arrow" size={16} /></button>
          </div>
          <div className="service-carousel" role="list" aria-label="Ride services">
            {services.map((service) => (
              <button key={service.name} className={`service-card ${activeService === service.name ? 'service-card--active' : ''}`} type="button" aria-pressed={activeService === service.name} onClick={() => setActiveService(service.name)}>
                <span className="service-card__icon"><Icon name={service.icon} size={27} /></span>
                <span className="service-card__label">{service.name}</span>
                <span className="service-card__time">{service.time}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="recent-section" aria-labelledby="recent-title">
          <div className="section-heading section-heading--compact">
            <div><span className="section-kicker">Quick access</span><h2 id="recent-title">Recent places</h2></div>
            <span className="recent-count">3 frequent</span>
          </div>
          <div className="recent-list">
            {recentPlaces.map((place) => {
              const isSaved = savedRides.includes(place.name)
              return (
                <div className="recent-item" key={place.name}>
                  <button className="recent-item__main" type="button" onClick={() => selectDestination(place)}>
                    <span className={`recent-icon recent-icon--${place.color}`}><Icon name={place.icon} size={20} /></span>
                    <span className="recent-item__copy"><strong>{place.name}</strong><small>{place.address}</small></span>
                    <span className="recent-item__time">{place.name === 'Home' ? '14 min' : place.name === 'Work' ? '22 min' : '9 min'}</span>
                    <Icon name="chevron" size={18} />
                  </button>
                  <button className={`recent-save ${isSaved ? 'is-saved' : ''}`} type="button" aria-label={`${isSaved ? 'Remove' : 'Save'} ${place.name}`} aria-pressed={isSaved} onClick={() => setSavedRides((saved) => saved.includes(place.name) ? saved.filter((item) => item !== place.name) : [...saved, place.name])}>
                    <Icon name="heart" size={17} />
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        <section className="promo-card" aria-label="Limited time promotion">
          <div className="promo-card__glow" />
          <div className="promo-card__spark"><Icon name="spark" size={28} /></div>
          <div className="promo-card__content">
            <span className="promo-badge">50% OFF</span>
            <span className="promo-label">Limited time</span>
            <h2>50% off your next 5 rides</h2>
            <p>Valid on Comfort and XL trips until Sunday.</p>
            <div className="promo-card__footer">
              <button type="button" className="promo-claim" onClick={() => setPromoClaimed(true)} disabled={promoClaimed}>{promoClaimed ? 'Offer applied' : 'Claim now'}</button>
              <span>Promo code: <strong>SWIFT50</strong></span>
            </div>
          </div>
        </section>

        <section className="nearby-section" aria-labelledby="nearby-title">
          <div className="section-heading section-heading--compact">
            <div><span className="section-kicker">Live nearby</span><h2 id="nearby-title">Drivers close to you</h2></div>
            <span className="driver-count"><span /> 12 drivers nearby</span>
          </div>
          <div className="map-card">
            <div className="map-grid" />
            <svg className="map-route" viewBox="0 0 420 150" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 128 C65 118 85 28 150 44 S260 125 326 82 S394 10 450 18" /><path className="map-route--dash" d="M-20 128 C65 118 85 28 150 44 S260 125 326 82 S394 10 450 18" /></svg>
            <div className="map-pin map-pin--start"><Icon name="pin" size={18} /></div>
            <div className="map-pin map-pin--end"><Icon name="pin" size={18} /></div>
            <div className="map-car"><Icon name="car" size={22} /></div>
            <div className="map-card__label"><span>Fastest pickup</span><strong>2 mins away</strong></div>
            <button className="map-expand" type="button" aria-label="Open live map"><Icon name="map" size={19} /></button>
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button key={item.label} type="button" className={activeNav === item.label ? 'bottom-nav__item active' : 'bottom-nav__item'} onClick={() => setActiveNav(item.label)} aria-current={activeNav === item.label ? 'page' : undefined}>
            <Icon name={item.icon} size={24} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {bookedRide && <BookingModal ride={bookedRide} onClose={onCloseBooking} />}
    </div>
  )
}

export default Home
