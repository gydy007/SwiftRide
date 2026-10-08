import { useState } from 'react'
import Icon from './Icon'

const RideCard = ({ ride, onBook, selected = false }) => {
  const [saved, setSaved] = useState(false)

  return (
    <article className={`ride-card ${selected ? 'ride-card--selected' : ''}`}>
      <button className="ride-card__select" type="button" onClick={() => onBook(ride)} aria-label={`Select ${ride.name}'s ride`} />
      <div className="card-top">
        <div className="driver-avatar" style={{ background: ride.color, color: ride.accent }}>{ride.initials}</div>
        <div className="driver-info">
          <h3>{ride.name}</h3>
          <p><Icon name="star" size={14} /> {ride.rating} · 128 trips</p>
        </div>
        <button className={`save-button ${saved ? 'is-saved' : ''}`} type="button" aria-label={`${saved ? 'Remove' : 'Save'} ${ride.name}'s ride`} aria-pressed={saved} onClick={() => setSaved((current) => !current)}>
          <Icon name="heart" size={18} />
        </button>
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

      <div className="card-footer">
        <span><small>From</small><b>{ride.price}</b></span>
        <button type="button" onClick={() => onBook(ride)}>Book ride <Icon name="arrow" size={17} /></button>
      </div>
    </article>
  )
}

export default RideCard
