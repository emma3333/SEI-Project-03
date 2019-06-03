import React from 'react'

const Card = ({ image, name }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>
    </div>
  )
}

export default Card


// <header className="card-header">
//   <p className="card-header-subtitle">
//     {name}
//   </p>
// </header>
