import { useEffect } from 'react'
import Icon from './Icon'

const BookingModal = ({ ride, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        <div className="success-icon"><Icon name="check" size={35} /></div>
        <span className="section-kicker">Ride confirmed</span>
        <h2 id="booking-title">You’re all set!</h2>
        <p>Meet {ride.name} at the pickup point in approximately {ride.time}.</p>

        <div className="modal-driver">
          <div className="driver-avatar" style={{ background: ride.color, color: ride.accent }}>{ride.initials}</div>
          <div><b>{ride.name}</b><span><Icon name="star" size={14} /> {ride.rating} · {ride.car}</span></div>
          <strong>{ride.price}</strong>
        </div>

        <div className="modal-route">
          <div><span className="route-dot start" /><b>Pickup</b><small>742 Evergreen Terrace</small></div>
          <div><span className="route-dot end" /><b>Destination</b><small>City Center Mall</small></div>
        </div>

        <button className="modal-action" type="button" onClick={onClose}>View my ride <Icon name="arrow" /></button>
      </div>
    </div>
  )
}

export default BookingModal
