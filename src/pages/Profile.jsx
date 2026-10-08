import { useState } from 'react'
import Icon from '../components/Icon'
import '../components/App.css'

const menuItems = [
  { title: 'Payment methods', detail: 'Visa •••• 4242', icon: 'creditCard', action: 'Payment methods' },
  { title: 'Promo codes', detail: '1 active', icon: 'localOffer', action: 'Promo codes', badge: '1 active' },
  { title: 'Saved places', detail: 'Home, Work, 3 more', icon: 'bookmark', action: 'Saved places' },
  { title: 'Notifications', detail: 'Push alerts & ride updates', icon: 'notifications', action: 'Notifications' },
  { title: 'Language', detail: 'English', icon: 'language', action: 'Language' },
]

const supportItems = [
  { title: 'Help & support', icon: 'supportAgent', action: 'Help & support' },
  { title: 'Privacy & terms', icon: 'shield', action: 'Privacy & terms' },
  { title: 'About SwiftRide', icon: 'info', action: 'About SwiftRide' },
]

const Profile = ({ onBack, onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [message, setMessage] = useState('')

  const showMessage = (action) => setMessage(`${action} opened`)

  return (
    <div className="swiftride-app profile-page">
      <main className="profile-content">
        <section className="profile-account-card" aria-labelledby="profile-name">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" aria-hidden="true">SM</div>
            <button className="profile-avatar__edit" type="button" aria-label="Edit photo" onClick={() => showMessage('Profile photo editor')}>
              <Icon name="edit" size={14} />
            </button>
          </div>
          <div className="profile-account-copy">
            <div className="profile-name-row">
              <h1 id="profile-name">Sarah M.</h1>
              <span className="verified-badge"><Icon name="check" size={13} /> Verified</span>
            </div>
            <p>+1 (555) 234-7890</p>
            <p>sarah.m@email.com</p>
          </div>
          <button className="profile-chevron" type="button" aria-label="Edit profile" onClick={() => showMessage('Profile editor')}>
            <Icon name="chevron" size={20} />
          </button>
        </section>

        <section className="profile-stats" aria-label="Profile statistics">
          <div><strong>24</strong><span>Trips</span></div>
          <div><strong>4.8</strong><span>Rating</span></div>
          <div><strong>$12.40</strong><span>Wallet</span></div>
        </section>

        <section className="profile-menu-card" aria-label="Account settings">
          <div className="profile-menu-list">
            {menuItems.map((item) => (
              <button className="profile-menu-row" type="button" key={item.title} onClick={() => showMessage(item.action)}>
                <span className="profile-menu-icon"><Icon name={item.icon} size={20} /></span>
                <span className="profile-menu-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                {item.badge && <span className="profile-menu-badge">{item.badge}</span>}
                <Icon name="chevron" size={20} />
              </button>
            ))}
          </div>
          <div className="profile-notifications-row">
            <span className="profile-menu-icon"><Icon name="bell" size={20} /></span>
            <span className="profile-menu-copy"><strong>Notifications</strong><small>Push alerts & ride updates</small></span>
            <button
              className={`profile-switch ${notificationsEnabled ? 'active' : ''}`}
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              aria-label="Toggle notifications"
              onClick={() => setNotificationsEnabled((enabled) => !enabled)}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="profile-menu-card profile-menu-card--support" aria-label="Support and information">
          <div className="profile-menu-list">
            {supportItems.map((item) => (
              <button className="profile-menu-row" type="button" key={item.title} onClick={() => showMessage(item.action)}>
                <span className="profile-menu-icon"><Icon name={item.icon} size={20} /></span>
                <span className="profile-menu-copy"><strong>{item.title}</strong></span>
                <Icon name="chevron" size={20} />
              </button>
            ))}
          </div>
        </section>

        <button className="profile-signout" type="button" onClick={() => showMessage('Sign out requested')}>
          <Icon name="logout" size={20} /> Sign out
        </button>
      </main>
      {message && (
        <div className="profile-toast" role="status">
          <span><Icon name="check" size={17} /></span>
          {message}
          <button type="button" onClick={() => setMessage('')} aria-label="Dismiss message"><Icon name="close" size={16} /></button>
        </div>
      )}
    </div>
  )
}

export default Profile
