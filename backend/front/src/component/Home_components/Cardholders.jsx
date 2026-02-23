import React from 'react'
import demoCards from '../../data/demoCards';
const Cardholders = () => {
  return (
    <div>
       <div className="container mt-4">
      <div className="row">
        {demoCards.map((card) => (
          <div key={card.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {card.category}
                </h6>
                <p className="card-text">{card.description}</p>
                <p className="fw-bold">₦{card.price.toLocaleString()}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Cardholders
