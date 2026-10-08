import { useState } from 'react'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Home from './pages/Home'
import ChooseRide from './pages/ChooseRide'
import PlanRide from './pages/PlanRide'
import TripCompleted from './pages/TripCompleted'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'

function App() {
  const [screen, setScreen] = useState('home')
  const [bookedRide, setBookedRide] = useState(null)

  const openChooseRide = () => setScreen('choose')
  const openTrip = () => setScreen('trip')
  const openWallet = () => setScreen('wallet')

  const confirmRide = (vehicle) => {
    setBookedRide({
      name: vehicle.name,
      price: vehicle.price,
      time: vehicle.eta,
      initials: 'SR',
      rating: '4.9',
      color: '#e4dfff',
      accent: '#3300c0',
      car: vehicle.name,
    })
    setScreen('home')
  }

  const renderScreen = () => {
    if (screen === 'choose') return <ChooseRide onBack={() => setScreen('home')} onConfirm={confirmRide} />
    if (screen === 'plan') return <PlanRide onBack={() => setScreen('home')} onChooseRide={openChooseRide} />
    if (screen === 'trip') return <TripCompleted onBack={() => setScreen('home')} onHome={() => setScreen('home')} />
    if (screen === 'wallet') return <Wallet onBack={() => setScreen('home')} onHome={() => setScreen('home')} />
    if (screen === 'profile') return <Profile onBack={() => setScreen('home')} onNavigate={setScreen} />
    return <Home onChooseRide={openChooseRide} onOpenTrip={openTrip} onPlanRide={() => setScreen('plan')} onOpenWallet={openWallet} bookedRide={bookedRide} onCloseBooking={() => setBookedRide(null)} />
  }

  return (
    <div className="app-shell">
      <AppHeader activeScreen={screen} onNavigate={setScreen} />
      {renderScreen()}
      <AppFooter activeScreen={screen} onNavigate={setScreen} />
    </div>
  )
}

export default App
