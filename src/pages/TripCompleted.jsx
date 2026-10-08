import { useState } from 'react'
import Icon from '../components/Icon'
import '../components/App.css'

const feedbackOptions = [
  { label: 'Clean car', icon: 'spark' },
  { label: 'Great conversation', icon: 'forum' },
  { label: 'Smooth driving', icon: 'car' },
]

const TripCompleted = ({ onBack, onHome }) => {
  const [rating, setRating] = useState(4)
  const [tip, setTip] = useState(2)
  const [selectedFeedback, setSelectedFeedback] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const toggleFeedback = (label) => {
    setSelectedFeedback((current) => current.includes(label)
      ? current.filter((item) => item !== label)
      : [...current, label])
  }

  const submitFeedback = () => {
    setSubmitted(true)
    window.setTimeout(onHome, 700)
  }

  return (
    <div className="trip-page swiftride-app">
      <main className="trip-content">
        <section className="trip-success" aria-labelledby="trip-success-title">
          <div className="trip-success__icon"><Icon name="check" size={34} /></div>
          <span className="section-kicker">Trip #SW-9041</span>
          <h2 id="trip-success-title">You’ve arrived</h2>
          <p>Thanks for riding with SwiftRide.</p>
          <div className="trip-success__route">
            <div><span className="trip-route-dot trip-route-dot--start" /><b>Pickup</b><small>742 Evergreen Terrace</small></div>
            <div className="trip-success__line"><span /></div>
            <div><span className="trip-route-dot trip-route-dot--end" /><b>Destination</b><small>City Center Mall</small></div>
          </div>
        </section>

        <section className="fare-card" aria-labelledby="fare-title">
          <div className="fare-card__header">
            <div><span className="section-kicker">Trip details</span><h2 id="fare-title">Total fare</h2></div>
            <strong>$8.50</strong>
          </div>
          <div className="fare-list">
            <div><span>Base fare</span><strong>$2.00</strong></div>
            <div><span>Distance (12.4 km)</span><strong>$4.40</strong></div>
            <div><span>Time (22 min)</span><strong>$1.60</strong></div>
            <div><span>Booking fee</span><strong>$0.50</strong></div>
          </div>
          <div className="promo-applied">
            <span><Icon name="spark" size={18} /></span>
            <div><strong>Promo applied — SWIFT50</strong><small>Saved $4.25 on this trip</small></div>
            <b>−$4.25</b>
          </div>
          <div className="payment-status">
            <div className="payment-status__card"><Icon name="money" size={19} /></div>
            <div><strong>Paid via Visa •••• 4242</strong><small>Payment completed</small></div>
            <span><Icon name="check" size={16} /> Paid</span>
          </div>
        </section>

        <section className="driver-card" aria-labelledby="driver-title">
          <div className="driver-card__heading">
            <div><span className="section-kicker">Your driver</span><h2 id="driver-title">Rate your ride</h2></div>
            <span className="verified-badge"><Icon name="shield" size={14} /> Verified</span>
          </div>
          <div className="driver-card__profile">
            <div className="driver-photo" aria-hidden="true">DK</div>
            <div>
              <strong>Daniel K.</strong>
              <span>Toyota Camry · KDA 452B</span>
              <small><Icon name="star" size={13} /> 4.9 · 128 previous trips</small>
            </div>
          </div>
          <div className="rating-control" role="group" aria-label="Rate your driver">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={value <= rating ? 'rating-star active' : 'rating-star'}
                aria-label={`${value} star${value === 1 ? '' : 's'}`}
                aria-pressed={value <= rating}
                onClick={() => setRating(value)}
              >
                <Icon name="star" size={34} />
              </button>
            ))}
          </div>
          <p className="rating-copy">{rating} of 5 · {['Needs improvement', 'Fair trip', 'Good ride', 'Great service', 'Exceptional ride!'][rating - 1]}</p>
        </section>

        <section className="trip-options" aria-labelledby="tip-title">
          <div className="trip-options__heading">
            <div><span className="section-kicker">Optional</span><h2 id="tip-title">Add a tip</h2></div>
            <span>Support your driver</span>
          </div>
          <div className="tip-options" role="group" aria-label="Choose a tip">
            {[0, 1, 2, 3].map((amount) => (
              <button key={amount} type="button" className={tip === amount ? 'tip-option active' : 'tip-option'} aria-pressed={tip === amount} onClick={() => setTip(amount)}>
                {amount === 0 ? 'No tip' : `$${amount}`}
              </button>
            ))}
          </div>
        </section>

        <section className="trip-options feedback-section" aria-labelledby="feedback-title">
          <div className="trip-options__heading">
            <div><span className="section-kicker">Share your experience</span><h2 id="feedback-title">What went well?</h2></div>
          </div>
          <div className="feedback-options">
            {feedbackOptions.map((option) => {
              const selected = selectedFeedback.includes(option.label)
              return (
                <button key={option.label} type="button" className={selected ? 'feedback-option active' : 'feedback-option'} aria-pressed={selected} onClick={() => toggleFeedback(option.label)}>
                  <Icon name={option.icon} size={17} /> {option.label}
                </button>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="trip-footer">
        <button className="trip-footer__later" type="button" onClick={onBack}>Rate later</button>
        <button className="trip-footer__submit" type="button" disabled={submitted} onClick={submitFeedback}>
          {submitted ? <><Icon name="check" size={19} /> Saved</> : <>Submit rating <Icon name="arrow" size={19} /></>}
        </button>
      </footer>
    </div>
  )
}

export default TripCompleted
