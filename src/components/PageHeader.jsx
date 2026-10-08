import Icon from './Icon'

const PageHeader = ({ title, onBack, onClose }) => (
  <header className="choose-header">
    <button className="choose-icon-button" type="button" onClick={onBack} aria-label="Go back">
      <Icon name="arrowLeft" />
    </button>
    <div>
      <span>SwiftRide</span>
      <h1>{title}</h1>
    </div>
    <button className="choose-icon-button" type="button" onClick={onClose} aria-label="Close flow">
      <Icon name="close" />
    </button>
  </header>
)

export default PageHeader
