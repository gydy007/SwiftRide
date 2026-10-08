import Icon from './Icon'

const serviceLinks = [
  { label: 'Ride now', screen: 'home' },
  { label: 'Plan a trip', screen: 'plan' },
  { label: 'Choose a ride', screen: 'choose' },
  { label: 'Trip activity', screen: 'trip' },
  { label: 'Wallet', screen: 'wallet' },
  { label: 'My profile', screen: 'profile' },
]

const supportLinks = [
  { label: 'Help centre', href: 'mailto:support@swiftride.com?subject=SwiftRide%20Help' },
  { label: 'Contact support', href: 'tel:+2345552347890' },
  { label: 'Safety & security', href: 'mailto:safety@swiftride.com?subject=Safety%20and%20security' },
  { label: 'Ride policies', href: 'mailto:legal@swiftride.com?subject=Ride%20policies' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'X', href: 'https://x.com/', icon: 'x' },
]

const AppFooter = ({ activeScreen, onNavigate }) => (
  <footer className="app-footer">
    <div className="app-footer__glow" aria-hidden="true" />
    <div className="app-footer__inner">
      <section className="app-footer__brand" aria-labelledby="footer-brand-title">
        <div className="app-footer__brand-top">
          <div className="app-footer__logo-wrap">
            <img src="/Assets/swiftride_logo/logo.png" alt="" className="app-footer__logo" />
          </div>
          <div>
            <h2 id="footer-brand-title">SwiftRide</h2>
            <p>Your city, moving with you.</p>
          </div>
        </div>

        <div className="app-footer__rating" aria-label="Rated 4.9 out of 5 by customers">
          <div className="app-footer__stars" aria-hidden="true">★★★★★</div>
          <div>
            <strong>4.9 / 5</strong>
            <span>from 12,000+ happy riders</span>
          </div>
        </div>

        <p className="app-footer__tagline">
          Friendly rides, trusted drivers, and a simpler way to move around Ado Ekiti.
        </p>

        <div className="app-footer__socials" aria-label="Social media links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className={`app-footer__social app-footer__social--${social.icon}`}
            >
              <span aria-hidden="true">{social.icon === 'instagram' ? 'ig' : social.icon === 'facebook' ? 'f' : '𝕏'}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="app-footer__column" aria-labelledby="footer-services-title">
        <h3 id="footer-services-title">Explore SwiftRide</h3>
        <nav className="app-footer__links" aria-label="SwiftRide services">
          {serviceLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={activeScreen === link.screen ? 'active' : ''}
              onClick={() => onNavigate(link.screen)}
              aria-current={activeScreen === link.screen ? 'page' : undefined}
            >
              {link.label}
              <Icon name="arrowRight" size={14} />
            </button>
          ))}
        </nav>
      </section>

      <section className="app-footer__column" aria-labelledby="footer-support-title">
        <h3 id="footer-support-title">Customer support</h3>
        <p className="app-footer__support-copy">We are here whenever you need a hand.</p>
        <nav className="app-footer__links" aria-label="Customer support links">
          {supportLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
              <Icon name="arrowRight" size={14} />
            </a>
          ))}
        </nav>
        <a className="app-footer__contact" href="mailto:hello@swiftride.com">
          <Icon name="forum" size={18} />
          <span><small>General enquiries</small><strong>hello@swiftride.com</strong></span>
        </a>
      </section>

      <section className="app-footer__column app-footer__column--contact" aria-labelledby="footer-contact-title">
        <h3 id="footer-contact-title">Come say hello</h3>
        <address>
          <span className="app-footer__contact-icon"><Icon name="location" size={18} /></span>
          <span><small>Head office</small><strong>Ado Ekiti, Ekiti State<br />Nigeria</strong></span>
        </address>
        <a href="tel:+2345552347890" className="app-footer__phone">
          <Icon name="forum" size={18} />
          <span><small>Call us</small><strong>+234 555 234 7890</strong></span>
        </a>
        <div className="app-footer__hours">
          <span className="app-footer__live-dot" />
          <span><strong>Support hours</strong><small>Monday–Sunday · 7:00 AM–11:00 PM</small></span>
        </div>
      </section>
    </div>

    <div className="app-footer__bottom">
      <p>© 2025 SwiftRide Mobility Inc. All rights reserved.</p>
      <div>
        <a href="mailto:legal@swiftride.com?subject=Privacy">Privacy</a>
        <a href="mailto:legal@swiftride.com?subject=Terms">Terms</a>
        <span>SwiftRide v2.4.1</span>
      </div>
    </div>
  </footer>
)

export default AppFooter
