import Icon from './Icon'

const navigation = [
  { label: 'Home', icon: 'home', screen: 'home' },
  { label: 'Activity', icon: 'schedule', screen: 'trip' },
  { label: 'Wallet', icon: 'wallet', screen: 'wallet' },
]

const AppHeader = ({ activeScreen, onNavigate }) => (
  <header className="app-header">
    <button className="app-header__brand" type="button" onClick={() => onNavigate('home')} aria-label="Go to SwiftRide home">
      <img src="/Assets/swiftride_logo/logo.png" alt="SwiftRide" className="app-logo" />
      <span>SwiftRide</span>
    </button>

    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigation.map((item) => (
        <button
          key={item.label}
          type="button"
          className={activeScreen === item.screen ? 'desktop-nav__item active' : 'desktop-nav__item'}
          onClick={() => onNavigate(item.screen)}
          aria-current={activeScreen === item.screen ? 'page' : undefined}
        >
          <Icon name={item.icon} size={17} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>

    <div className="app-header__actions">
      <button className="icon-button notification-button" type="button" aria-label="Notifications" onClick={() => onNavigate('trip')}>
        <Icon name="bell" size={22} />
        <span className="notification-dot" />
      </button>
      <button className="profile-button" type="button" aria-label="Open profile" onClick={() => onNavigate('profile')}><span>AR</span></button>
    </div>
  </header>
)

export default AppHeader
