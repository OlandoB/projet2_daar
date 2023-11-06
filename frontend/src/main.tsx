import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import TopBar from './components/Topbar'
import Collection from './Collection'
import Booster from './Booster'
import { useWallet } from './App'
const node = document.getElementById('root') as HTMLElement
const imageUrls = [
  'https://images.pokemontcg.io/hgss4/1.png',
  'https://images.pokemontcg.io/xy5/1.png',
  'https://images.pokemontcg.io/pl1/1.png',
  'https://images.pokemontcg.io/dp3/1.png',
  'https://images.pokemontcg.io/det1/1.png',
]

const Main = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const wallet = useWallet()

  const handleShowPage = page => {
    setCurrentPage(page)
  }
  return (
    <React.StrictMode>
      <TopBar currentPage={currentPage} handleShowPage={handleShowPage} />
      {currentPage === 'home' && <App wallet={wallet} />}
      {currentPage === 'collection' && (
        <Collection imageUrls={imageUrls} wallet={wallet} />
      )}
      {currentPage === 'booster' && <Booster wallet={wallet} />}
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(node)
root.render(<Main />)
