import React from 'react'
import './css/Collection.css'

const Collection = ({ imageUrls, wallet }) => {
  return (
    <div className="collection-container">
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="collection-item">
          <img src={imageUrl} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  )
}

export default Collection
