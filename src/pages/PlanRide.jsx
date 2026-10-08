import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import { getCurrentLocation, getNearbyPlaces, getOpenStreetMapStatus, searchPlaces } from '../services/openStreetMap'
import '../components/App.css'

const recentDestinations = [
  { name: 'City Center Mall', address: '88 Harbor St, Central Plaza', frequent: true },
  { name: 'Downtown Tech Hub', address: 'Tower 2, Innovation District', frequent: true },
  { name: 'Grand Central Station', address: '45 Union Ave' },
  { name: 'Riverside Park', address: '200 Riverwalk Blvd' },
]

const nearbyPlaces = [
  { name: 'Blue Bottle Coffee', address: '104 Market St', distance: '0.3 km' },
  { name: 'City Library', address: '500 Library Way', distance: '0.8 km' },
  { name: 'Metro Station — Central', address: 'Market & 4th Ave', distance: '1.1 km' },
]

const savedPlaces = [
  { name: 'Home', address: '12 Oak Street, Westside', icon: 'home' },
  { name: 'Work', address: 'Downtown Tech Hub, Tower 2', icon: 'apartment' },
]

const PlanRide = ({ onBack, onChooseRide }) => {
  const [destination, setDestination] = useState('')
  const [pickup, setPickup] = useState('742 Evergreen Terrace')
  const [currentLocation, setCurrentLocation] = useState(null)
  const [mapReady] = useState(getOpenStreetMapStatus())
  const [searchResults, setSearchResults] = useState([])
  const [nearbyResults, setNearbyResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [activePlace, setActivePlace] = useState(null)
  const [recent, setRecent] = useState(recentDestinations)
  const [saved, setSaved] = useState(savedPlaces)
  const [stopAdded, setStopAdded] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadLocations = async () => {
      try {
        const location = await getCurrentLocation()
        if (cancelled) return
        setCurrentLocation(location)
        setNearbyResults(await getNearbyPlaces(location))
      } catch (error) {
        if (!cancelled) setSearchError(error.message)
      }
    }

    loadLocations()
    return () => { cancelled = true }
  }, [])

  const selectPlace = (place) => {
    if (activePlace === 'destination') {
      setDestination(place.name)
      setSearchResults([])
      setSearchError('')
    } else {
      setPickup(place.name)
    }
    setActivePlace(null)
  }

  const handleDestinationChange = async (value) => {
    setDestination(value)
    setSearchError('')
    if (value.trim().length < 3) {
      setSearchResults([])
      return
    }

    setSearching(true)
    try {
      const places = await searchPlaces(value, { location: currentLocation })
      setSearchResults(places)
    } catch (error) {
      setSearchError(error.message)
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const useCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation()
      setCurrentLocation(location)
      setPickup('Current location')
      setSearchError('')
      setNearbyResults(await getNearbyPlaces(location))
    } catch (error) {
      setSearchError(error.message)
    }
  }

  const addStop = () => {
    if (!destination.trim()) {
      setDestination('Additional stop')
      setStopAdded(true)
    }
  }

  return (
    <div className="plan-page swiftride-app">
      <header className="plan-header">
        <button className="page-back-button" type="button" onClick={onBack} aria-label="Back to home"><Icon name="arrowLeft" size={21} /></button>
        <div><span>Plan your ride</span><h1>Choose a destination</h1></div>
        <span className="plan-header__spacer" aria-hidden="true" />
      </header>
      <main className="plan-content">
        <div className="plan-focus-pill">
          <span className="plan-focus-pill__dot" />
          Destination input focused state
        </div>

        <section className="route-planner" aria-label="Plan your route">
          <div className="route-planner__visual" aria-hidden="true">
            <span className="route-planner__pickup" />
            <span className="route-planner__line" />
            <span className="route-planner__destination" />
          </div>
          <div className="route-planner__fields">
            <div className="route-input route-input--pickup">
              <div className="route-input__copy">
                <span className="route-input__label">Pickup</span>
                <button type="button" onClick={onChooseRide}>
                  <strong>{pickup}</strong>
                  <Icon name="chevron" size={15} />
                </button>
              </div>
              <button className="route-input__time" type="button">
                <Icon name="calendar" size={16} />
                <span>Now</span>
                <Icon name="chevron" size={14} />
              </button>
            </div>

            <div className="route-input route-input--destination">
              <div className="route-input__copy">
                <span className="route-input__label">Destination</span>
                <input
                  value={destination}
                  onChange={(event) => handleDestinationChange(event.target.value)}
                  onFocus={() => setActivePlace('destination')}
                  onBlur={() => window.setTimeout(() => setActivePlace(null), 120)}
                  placeholder="Search a place in Nigeria"
                  aria-label="Destination"
                  autoComplete="off"
                />
              </div>
              <button className="route-input__add" type="button" onClick={addStop}>
                <Icon name="add" size={17} />
                <span>Add stop</span>
              </button>
            </div>
            {activePlace === 'destination' && (
              <div className="place-search-results" role="listbox" aria-label="Destination suggestions">
                {searching && <div className="place-search-loading"><span /> Searching places…</div>}
                {searchError && <div className="place-search-error">{searchError}</div>}
                {!searching && searchResults.length === 0 && destination.trim().length >= 3 && mapReady && (
                  <div className="place-search-empty">No matching places found.</div>
                )}
                {searchResults.map((place) => (
                  <button key={place.id} type="button" role="option" className="place-search-result" onMouseDown={() => selectPlace(place)}>
                    <span className="place-search-result__icon"><Icon name="pin" size={17} /></span>
                    <span><strong>{place.name}</strong><small>{place.address}</small></span>
                    {place.rating && <span className="place-search-result__rating">★ {place.rating}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="plan-quick-actions" aria-labelledby="saved-places-title">
          <div className="plan-section-heading">
            <div><span className="section-kicker">Quick access</span><h2 id="saved-places-title">Saved places</h2></div>
          </div>
          <div className="plan-quick-list">
            {saved.map((place) => (
              <button key={place.name} type="button" onClick={() => selectDestination(place)}>
                <span className="plan-quick-icon"><Icon name={place.icon} size={18} /></span>
                <span><strong>{place.name}</strong><small>{place.address}</small></span>
                <Icon name="chevron" size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="plan-results" aria-labelledby="recent-title">
          <div className="plan-section-heading">
            <div><span className="section-kicker">Your history</span><h2 id="recent-title">Recent searches</h2></div>
            <button type="button" className="text-button" onClick={() => setRecent([])}>Clear all</button>
          </div>
          <div className="plan-result-list">
            {recent.map((place) => (
              <button key={place.name} type="button" className="plan-result" onClick={() => selectDestination(place)}>
                <span className="plan-result__icon"><Icon name="history" size={19} /></span>
                <span className="plan-result__copy">
                  <strong>{place.name}</strong>
                  <small>{place.address}</small>
                </span>
                {place.frequent && <span className="frequent-pill">Frequent</span>}
                <Icon name="chevron" size={18} />
              </button>
            ))}
            {recent.length === 0 && <div className="plan-empty">No recent searches yet.</div>}
          </div>
        </section>

        <section className="plan-results" aria-labelledby="nearby-title">
          <div className="plan-section-heading">
            <div><span className="section-kicker">Nearby</span><h2 id="nearby-title">Around you</h2></div>
            <button type="button" className="text-button" onClick={useCurrentLocation}>Use location</button>
          </div>
          <div className="plan-result-list">
            {nearbyResults.length > 0 ? nearbyResults.map((place) => (
              <button key={place.id} type="button" className="plan-result" onClick={() => selectPlace(place)}>
                <span className="plan-result__icon plan-result__icon--secondary"><Icon name="location" size={19} /></span>
                <span className="plan-result__copy">
                  <strong>{place.name}</strong>
                  <small>{place.address}</small>
                </span>
                {place.rating && <span className="place-search-result__rating">★ {place.rating}</span>}
                <Icon name="chevron" size={18} />
              </button>
            )) : nearbyPlaces.map((place) => (
              <button key={place.name} type="button" className="plan-result" onClick={() => selectPlace(place)}>
                <span className="plan-result__icon plan-result__icon--secondary"><Icon name="location" size={19} /></span>
                <span className="plan-result__copy">
                  <strong>{place.name}</strong>
                  <small>{place.address} · {place.distance}</small>
                </span>
                <Icon name="chevron" size={18} />
              </button>
            ))}
          </div>
        </section>

        {stopAdded && <div className="plan-stop-note"><Icon name="check" size={17} /> Stop added to your route.</div>}
        {activePlace && <div className="plan-active-state"><span /> {activePlace === 'destination' ? 'Destination selected' : `${activePlace} selected`}</div>}
      </main>

      <footer className="plan-footer">
        <div>
          <span>Ready to ride?</span>
          <strong>{destination || 'Choose a destination'}</strong>
        </div>
        <button type="button" disabled={!destination.trim()} onClick={onChooseRide}>
          Continue <Icon name="arrow" size={18} />
        </button>
      </footer>
    </div>
  )
}

export default PlanRide
