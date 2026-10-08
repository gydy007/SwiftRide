import { useEffect, useRef, useState } from 'react'
import BookingModal from '../components/BookingModal'
import Icon from '../components/Icon'
import RideCard from '../components/RideCard'
import { getCurrentLocation, searchPlaces } from '../services/openStreetMap'
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

const initialPlaces = [
  { name: 'Home', address: '12 Oak Street, Westside', icon: 'home', color: 'primary', location: { lat: 7.3972, lng: 5.2582 } },
  { name: 'Work', address: 'Downtown Tech Hub, Tower 2', icon: 'apartment', color: 'secondary', location: { lat: 7.4015, lng: 5.2610 } },
  { name: 'Mall', address: '88 Market St, Central Plaza', icon: 'localMall', color: 'tertiary', location: { lat: 7.3994, lng: 5.2664 } },
]

const fallbackLocation = { lat: 7.3972, lng: 5.2582 }
const fallbackDestination = { lat: 7.3994, lng: 5.2664 }
const recentPlacesStorageKey = 'swiftride-recent-places'

const loadRecentPlaces = () => {
  try {
    const storedPlaces = JSON.parse(window.localStorage.getItem(recentPlacesStorageKey) || '[]')
    return Array.isArray(storedPlaces) && storedPlaces.length ? storedPlaces : initialPlaces
  } catch {
    return initialPlaces
  }
}

const Home = ({ onChooseRide, onOpenTrip, onPlanRide, onOpenWallet, bookedRide, onCloseBooking }) => {
  const [activeService, setActiveService] = useState('Ride')
  const [pickup, setPickup] = useState('742 Evergreen Terrace')
  const [pickupLocation, setPickupLocation] = useState(fallbackLocation)
  const [destination, setDestination] = useState('')
  const [destinationLocation, setDestinationLocation] = useState(fallbackDestination)
  const [currentLocation, setCurrentLocation] = useState(fallbackLocation)
  const [locationStatus, setLocationStatus] = useState('Finding your location…')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [pickupSearching, setPickupSearching] = useState(false)
  const [pickupError, setPickupError] = useState('')
  const [recentPlaces, setRecentPlaces] = useState(loadRecentPlaces)
  const [promoClaimed, setPromoClaimed] = useState(false)
  const [savedRides, setSavedRides] = useState([])
  const ridesSectionRef = useRef(null)

  useEffect(() => {
    let active = true

    getCurrentLocation()
      .then((location) => {
        if (!active) return
        setCurrentLocation(location)
        setLocationStatus('Location enabled')
      })
      .catch(() => {
        if (!active) return
        setLocationStatus('Using Ado Ekiti location')
      })

    return () => { active = false }
  }, [])

  useEffect(() => {
    const query = pickup.trim()
    if (query.length < 3) {
      setPickupSuggestions([])
      setPickupError('')
      return undefined
    }

    const controller = new AbortController()
    setPickupSearching(true)
    setPickupError('')

    const timeout = window.setTimeout(() => controller.abort(), 8000)
    searchPlaces(query, { location: currentLocation, signal: controller.signal })
      .then((places) => {
        setPickupSuggestions(places.slice(0, 5))
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setPickupError(error.message)
      })
      .finally(() => {
        window.clearTimeout(timeout)
        setPickupSearching(false)
      })

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [pickup, currentLocation])

  const addRecentPlace = (place) => {
    const entry = {
      name: place.name,
      address: place.address,
      icon: 'pin',
      color: 'primary',
      location: place.location,
    }

    setRecentPlaces((places) => {
      const nextPlaces = [entry, ...places.filter((item) => item.address !== place.address)].slice(0, 5)
      window.localStorage.setItem(recentPlacesStorageKey, JSON.stringify(nextPlaces))
      return nextPlaces
    })
  }

  const selectPickup = (place) => {
    setPickup(place.name)
    setPickupLocation(place.location)
    setPickupSuggestions([])
    addRecentPlace(place)
  }

  const selectDestination = (place) => {
    setDestination(place.address)
    setDestinationLocation(place.location)
    addRecentPlace(place)
    ridesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const saveTypedLocations = () => {
    if (pickup.trim() && pickup !== '742 Evergreen Terrace') {
      addRecentPlace({ name: pickup, address: pickup, location: pickupLocation })
    }
    if (destination.trim()) {
      addRecentPlace({ name: destination, address: destination, location: destinationLocation })
    }
  }

  const mapUrl = new URL('https://www.openstreetmap.org/export/embed.html')
  mapUrl.searchParams.set('layer', 'mapnik')
  mapUrl.searchParams.set('marker', `${currentLocation.lat},${currentLocation.lng}`)
  mapUrl.searchParams.append('marker', `${destinationLocation.lat},${destinationLocation.lng}`)
  mapUrl.searchParams.set('bbox', `${Math.max(5.248, Math.min(currentLocation.lng, destinationLocation.lng) - 0.008)},${Math.max(7.387, Math.min(currentLocation.lat, destinationLocation.lat) - 0.008)},${Math.min(5.288, Math.max(currentLocation.lng, destinationLocation.lng) + 0.008)},${Math.min(7.407, Math.max(currentLocation.lat, destinationLocation.lat) + 0.008)}`)

  return (
    <div className="swiftride-app">
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
          <div className="search-field-wrap">
            <label className="search-field">
              <span className="search-field__icon search-field__icon--pickup"><Icon name="pin" size={20} /></span>
              <span className="search-field__copy"><small>Pickup location</small><input value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Enter pickup location" aria-label="Pickup location" autoComplete="off" /></span>
              <Icon name="chevron" size={18} />
            </label>
            {pickup.trim().length >= 3 && (
              <div className="place-search-results place-search-results--home" role="listbox" aria-label="Pickup suggestions">
                {pickupSearching && <div className="place-search-loading"><span /> Searching places…</div>}
                {pickupError && <div className="place-search-error">{pickupError}</div>}
                {!pickupSearching && pickupSuggestions.length === 0 && !pickupError && <div className="place-search-empty">No matching places found.</div>}
                {pickupSuggestions.map((place) => (
                  <button key={place.id} type="button" role="option" className="place-search-result" onMouseDown={() => selectPickup(place)}>
                    <span className="place-search-result__icon"><Icon name="pin" size={17} /></span>
                    <span><strong>{place.name}</strong><small>{place.address}</small></span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <label className="search-field search-field--destination">
            <span className="search-field__icon search-field__icon--destination"><Icon name="pin" size={20} /></span>
            <span className="search-field__copy"><small>Destination</small><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Type your destination" aria-label="Destination" /></span>
            <Icon name="chevron" size={18} />
          </label>
          <div className="search-options">
            <div><Icon name="calendar" size={17} /><span><small>When</small><strong>Today, 6:30 PM</strong></span></div>
            <div><Icon name="users" size={17} /><span><small>Seats</small><strong>1 passenger</strong></span></div>
            <div><Icon name="money" size={17} /><span><small>Budget</small><strong>$25 max</strong></span></div>
          </div>
          <button className="search-button" type="button" onClick={() => { saveTypedLocations(); onPlanRide() }} disabled={!pickup.trim() || !destination.trim()}><Icon name="search" size={20} /> Plan your ride <Icon name="arrow" size={20} /></button>
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
            <span className="recent-count">{recentPlaces.length} recent</span>
          </div>
          <div className="recent-list">
            {recentPlaces.map((place) => {
              const isSaved = savedRides.includes(place.name)
              return (
                <div className="recent-item" key={`${place.name}-${place.address}`}>
                  <button className="recent-item__main" type="button" onClick={() => selectDestination(place)}>
                    <span className={`recent-icon recent-icon--${place.color}`}><Icon name={place.icon} size={20} /></span>
                    <span className="recent-item__copy"><strong>{place.name}</strong><small>{place.address}</small></span>
                    <span className="recent-item__time">{place.name === 'Home' ? '14 min' : place.name === 'Work' ? '22 min' : place.name === 'Mall' ? '9 min' : 'Recent'}</span>
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
            <iframe
              className="map-frame"
              title="Live map showing your location and destination"
              src={mapUrl.toString()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-overlay map-overlay--location">
              <span className="map-overlay__icon"><Icon name="pin" size={15} /></span>
              <span><small>Your location</small><strong>{locationStatus}</strong></span>
            </div>
            <div className="map-overlay map-overlay--destination">
              <span className="map-overlay__icon"><Icon name="location" size={15} /></span>
              <span><small>Destination</small><strong>{destination || 'Ado Ekiti route'}</strong></span>
            </div>
            <a className="map-expand" href={`https://www.openstreetmap.org/?mlat=${currentLocation.lat}&mlon=${currentLocation.lng}#map=14/${currentLocation.lat}/${currentLocation.lng}`} target="_blank" rel="noreferrer" aria-label="Open live map"><Icon name="map" size={19} /></a>
            <div className="map-loading" aria-hidden="true" />
          </div>
        </section>
      </main>

      {bookedRide && <BookingModal ride={bookedRide} onClose={onCloseBooking} />}
    </div>
  )
}

export default Home
