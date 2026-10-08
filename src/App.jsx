import { useState } from 'react'
import Home from './pages/Home'
import ChooseRide from './pages/ChooseRide'

function App() {
  const [screen, setScreen] = useState('home')
  const [bookedRide, setBookedRide] = useState(null)

  const openChooseRide = () => setScreen('choose')

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

  return screen === 'choose'
    ? <ChooseRide onBack={() => setScreen('home')} onConfirm={confirmRide} />
    : <Home onChooseRide={openChooseRide} bookedRide={bookedRide} onCloseBooking={() => setBookedRide(null)} />
}

export default App
