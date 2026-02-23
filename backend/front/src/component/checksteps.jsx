import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="container my-3">
      <Nav className="justify-content-center">
        <Nav.Item>
          {step1 ? (
            <Nav.Link as={Link} to="/Login" className="fw-bold text-success">
              1. Login
            </Nav.Link>
          ) : (
            <Nav.Link disabled>1. Login</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <Nav.Link as={Link} to="/Shipping" className="fw-bold text-success">
              2. Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>2. Shipping</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <Nav.Link as={Link} to="/Payment" className="fw-bold text-success">
              3. Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled>3. Payment</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <Nav.Link as={Link} to="/PlaceOrder" className="fw-bold text-success">
              4. Place Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>4. Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default CheckSteps