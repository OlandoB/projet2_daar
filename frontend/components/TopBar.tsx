import React from 'react'

const TopBar = ({ currentPage, handleShowPage }) => {
  return (
    <div className="top-bar">
      <button
        onClick={() => handleShowPage('home')}
        className={currentPage === 'home' ? 'active' : ''}
      >
        Home
      </button>
      <button
        onClick={() => handleShowPage('collection')}
        className={currentPage === 'collection' ? 'active' : ''}
      >
        Collection
      </button>
      <button
        onClick={() => handleShowPage('booster')}
        className={currentPage === 'booster' ? 'active' : ''}
      >
        Booster
      </button>
    </div>
  )
}

export default TopBar
