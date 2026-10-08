import { useState } from 'react'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import RideCard from '../components/RideCard'
import '../components/App.css'

const matchingRides = [
  { name: 'Maya Chen', initials: 'MC', time: '8 min', distance: '2.4 mi', price: '$18.50', rating: '4.9', seats: 2, color: '#e8d5ff', car: 'Toyota Corolla', accent: '#7657d6' },
  { name: 'Jordan Lee', initials: 'JL', time: '12 min', distance: '3.1 mi', price: '$15.90', rating: '4.8', seats: 1, color: '#d8f2ea', car: 'Honda Civic', accent: '#16866f' },
  { name: 'Sofia Davis', initials: 'SD', time: '17 min', distance: '4.6 mi', price: '$14.20', rating: '5.0', seats: 3, color: '#ffe0d2', car: 'Mazda 3', accent: '#e36b42' },
]

const ChooseRide = ({ onBack, onConfirm }) => {
  const [selected, setSelected] = useState(matchingRides[0])
  const [payment, setPayment] = useState('Visa •••• 2481')

  return (
    <div className="choose-page swiftride-app">
      <PageHeader title="Choose a ride" onBack={onBack} onClose={onBack} />
      <main className="choose-content">
        <section className="route-summary">
          <div className="route-summary__label"><Icon name="pin" size={18} /><span><small>Your route</small><strong>742 Evergreen Terrace <Icon name="arrow" size={14} /> City Center Mall</strong></span></div>
          <div className="route-summary__details"><span><Icon name="calendar" size={16} /> Today, 6:30 PM</span><span><Icon name="users" size={16} /> 1 passenger</span></div>
        </section>

        <section className="route-map" aria-label="Route map">
          <div className="route-map__background" />
          <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 142 C 52 116 70 26 126 52 S 224 130 290 82 S 366 15 430 41" /><path className="route-map__dash" d="M-20 142 C 52 116 70 26 126 52 S 224 130 290 82 S 366 15 430 41" /></svg>
          <div className="route-pin route-pin--pickup"><Icon name="pin" size={18} /></div>
          <div className="route-pin route-pin--destination"><Icon name="pin" size={18} /></div>
          <div className="route-map__travel"><Icon name="car" size={22} /></div>
          <div className="route-map__badge"><span className="live-dot" /> 2.4 mi · 8 min</div>
        </section>

        <section className="choose-scroll" aria-labelledby="drivers-title">
          <div className="choose-heading"><div><span className="section-kicker">Nearby drivers</span><h2 id="drivers-title">Available rides</h2></div><span>3 matches</span></div>
          <div className="ride-list">
            {matchingRides.map((ride) => <RideCard key={ride.name} ride={ride} onBook={setSelected} selected={selected.name === ride.name} />)}
          </div>
        </section>

        <section className="payment-panel">
          <div className="payment-panel__label"><span><Icon name="wallet" size={19} /> Payment method</span><button type="button">Change</button></div>
          <button className="payment-choice" type="button" onClick={() => setPayment(payment === 'Visa •••• 2481' ? 'Apple Pay' : 'Visa •••• 2481')}>
            <span className="payment-card-logo">VISA</span>
            <span><strong>{payment}</strong><small>Expires 09/28</small></span>
            <Icon name="chevron" size={17} />
          </button>
        </section>
      </main>

      <footer className="ride-footer">
        <div className="ride-footer__summary"><span>Your ride</span><strong>{selected.name} · {selected.price}</strong><small>{selected.time} away · {selected.car}</small></div>
        <button type="button" className="request-button" onClick={() => onConfirm(selected)}>Request ride <Icon name="arrow" size={19} /></button>
      </footer>
    </div>
  )
}

export default ChooseRide
