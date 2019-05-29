import React from 'react'

const Card = ({ image, title }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={title} />
        </figure>
      </div>

    </div>
  )
}

export default Card
