import { useState } from 'react'
import Icon from '../components/Icon'
import '../components/App.css'

const paymentMethods = [
  { id: 1, brand: 'VISA', label: 'Visa •••• 4242', expiry: 'Expires 09/28', default: true },
  { id: 2, brand: 'MC', label: 'Mastercard •••• 8810', expiry: 'Expires 03/27' },
]

const Wallet = ({ onBack, onHome }) => {
  const [balance, setBalance] = useState(12.4)
  const [masked, setMasked] = useState(false)
  const [autoReload, setAutoReload] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [methods, setMethods] = useState(paymentMethods)
  const [selectedMethod, setSelectedMethod] = useState(1)
  const [points, setPoints] = useState(240)
  const [redeemed, setRedeemed] = useState(false)

  const addFunds = () => {
    setBalance((current) => Number((current + 10).toFixed(2)))
  }

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (!code) {
      setPromoMessage('Enter a promo code to continue.')
      return
    }
    setPromoMessage(`Promo “${code}” applied — 20% off your next two rides.`)
    setPromoCode('')
  }

  const removeMethod = (id) => {
    setMethods((current) => {
      const remaining = current.filter((method) => method.id !== id)
      if (selectedMethod === id) setSelectedMethod(remaining[0]?.id ?? 0)
      return remaining
    })
  }

  const redeemPoints = () => {
    if (points >= 100) {
      setPoints((current) => current - 100)
      setRedeemed(true)
    }
  }

  return (
    <div className="wallet-page swiftride-app">
      <main className="wallet-content">
        <section className="balance-card" aria-labelledby="balance-title">
          <svg className="balance-card__route" viewBox="0 0 360 170" fill="none" aria-hidden="true">
            <path d="M-20 130C40 130 70 40 150 50S260 140 380 90" stroke="currentColor" strokeDasharray="6 6" strokeWidth="3" />
            <circle cx="150" cy="50" r="6" fill="currentColor" />
            <circle cx="280" cy="110" r="4" fill="currentColor" />
            <path d="M80-10C110 60 160 80 220 30S320 80 390 120" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
          <div className="balance-card__top">
            <div>
              <span id="balance-title">SwiftRide balance</span>
              <button type="button" className="balance-visibility" onClick={() => setMasked((current) => !current)} aria-label={masked ? 'Show balance' : 'Hide balance'}>
                <Icon name={masked ? 'eyeOff' : 'eye'} size={17} />
              </button>
            </div>
            <span className="balance-card__status">Available</span>
          </div>
          <strong className="balance-card__amount" aria-live="polite">{masked ? '••••••••' : `$${balance.toFixed(2)}`}</strong>
          <div className="balance-card__actions">
            <button type="button" className="balance-action balance-action--primary" onClick={addFunds}>
              <Icon name="add" size={18} /> Add funds
            </button>
            <button type="button" className={`balance-action balance-action--secondary ${autoReload ? 'active' : ''}`} onClick={() => setAutoReload((current) => !current)} aria-pressed={autoReload}>
              <Icon name="schedule" size={17} /> Auto-reload: {autoReload ? 'On' : 'Off'}
            </button>
          </div>
        </section>

        <section className="wallet-section promo-section" aria-labelledby="promo-title">
          <div className="wallet-section__heading">
            <div><span className="section-kicker">Savings</span><h2 id="promo-title">Have a promo code?</h2></div>
            <span>1 available</span>
          </div>
          <div className="promo-input">
            <Icon name="spark" size={18} />
            <input value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Enter code (e.g. SWIFT50)" aria-label="Promo code" />
            <button type="button" onClick={applyPromo}>Apply</button>
          </div>
          {promoMessage && <div className={`promo-message ${promoMessage.startsWith('Enter') ? 'promo-message--error' : ''}`} role="status"><Icon name={promoMessage.startsWith('Enter') ? 'close' : 'check'} size={16} /> {promoMessage}</div>}
        </section>

        <section className="wallet-section" aria-labelledby="payment-title">
          <div className="wallet-section__heading wallet-section__heading--row">
            <div><span className="section-kicker">Checkout</span><h2 id="payment-title">Payment methods</h2></div>
            <button type="button" className="wallet-add-button"><Icon name="add" size={16} /> Add new</button>
          </div>
          <div className="payment-list">
            {methods.map((method) => (
              <div key={method.id} className={`payment-method ${selectedMethod === method.id ? 'payment-method--selected' : ''}`}>
                <button type="button" className="payment-method__main" onClick={() => setSelectedMethod(method.id)} aria-pressed={selectedMethod === method.id} aria-label={`Select ${method.label}`}>
                  <span className={`payment-brand payment-brand--${method.brand.toLowerCase()}`}>{method.brand}</span>
                  <span><strong>{method.label}</strong><small>{method.expiry} {method.default && <b>Default</b>}</small></span>
                  <span className="payment-method__check"><Icon name="check" size={15} /></span>
                </button>
                {methods.length > 1 && <button type="button" className="payment-method__remove" onClick={() => removeMethod(method.id)}>Remove</button>}
              </div>
            ))}
            {methods.length === 0 && <div className="wallet-empty">No payment methods saved yet.</div>}
          </div>
        </section>

        <section className="wallet-section" aria-labelledby="credit-title">
          <div className="wallet-section__heading">
            <div><span className="section-kicker">Benefits</span><h2 id="credit-title">SwiftRide credit</h2></div>
            <button type="button" className="wallet-info" aria-label="Credit information"><Icon name="shield" size={18} /></button>
          </div>
          <div className="credit-card">
            <div className="credit-card__row">
              <span className="credit-card__icon credit-card__icon--purple"><Icon name="redeem" size={20} /></span>
              <span><strong>Referral credit</strong><small>Applied automatically on next ride</small></span>
              <strong className="credit-card__value credit-card__value--secondary">$5.00</strong>
            </div>
            <div className="credit-card__divider" />
            <div className="credit-card__row">
              <span className="credit-card__icon credit-card__icon--teal"><Icon name="star" size={20} /></span>
              <span><strong>Reward points</strong><small>100 pts = $1 ride credit</small></span>
              <span className="credit-card__points"><strong>{points} pts</strong><button type="button" onClick={redeemPoints} disabled={points < 100 || redeemed}>{redeemed ? 'Redeemed' : 'Redeem'}</button></span>
            </div>
          </div>
        </section>

        <section className="insight-card" aria-label="Monthly commute spending insight">
          <span className="insight-card__icon"><Icon name="spark" size={20} /></span>
          <span><strong>April ride budget</strong><small>You saved $18.50 with SwiftPass</small></span>
          <Icon name="chevron" size={20} />
        </section>
      </main>
    </div>
  )
}

export default Wallet
