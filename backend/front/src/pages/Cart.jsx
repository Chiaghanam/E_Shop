import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PROXY } from '../component/Constants/api'
// import { MEDIA_URL } from '../component/Constants/api'
import { removeFromCart, updateQuantity } from '../component/slice/cartslice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { item: cartdata, totalprice } = useSelector((state) => state.cart)

  const handleRemoveCart = (payload) => {
    dispatch(removeFromCart(payload))
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }))
    }
  }

  const minAmount = 1
  const price = ({ amount }) => {
    return amount.toFixed(2)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      <div className="row">
        <div className="col-md-8">
          {cartdata.length === 0 ? (
            <div className="alert alert-info">Your cart is empty</div>
          ) : (
            cartdata.map((cdata) => {
              const maxAmount = cdata.countInStock
              const quantityOptions = Array.from(
                { length: maxAmount },
                (_, i) => i + minAmount
              )

              return (
                <div key={cdata._id} className="card mb-3 shadow-sm">
                  <div className="row g-0 align-items-center">
                    {/* Product Image */}
                    <div className="col-md-3 text-center">
                      <img
                        src={cdata.image}
                        alt={cdata.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '150px' }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="col-md-5">
                      <div className="card-body">
                        <h5 className="card-title">{cdata.name}</h5>
                        <p className="card-text text-muted">₦{cdata.price}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-md-4 text-center">
                      <div className="d-flex flex-column align-items-center gap-2">
                        <div className="d-flex align-items-center gap-2">
                          <label className="mb-0">Qty:</label>
                          <select
                            className="form-select form-select-sm"
                            style={{ width: '70px' }}
                            value={cdata.quantity}
                            onChange={(e) =>
                              handleQuantityChange(cdata._id, Number(e.target.value))
                            }
                          >
                            {quantityOptions.map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="mb-0 fw-bold text-success">₦{(cdata.price * cdata.quantity).toFixed(2)}</p>
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={() => handleRemoveCart(cdata._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary Section */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <p className="card-text">
                <strong>Total Price:</strong> ₦{price({ amount: totalprice })}
              </p>
              {cartdata.length > 0 && (
                <button
                  className="btn btn-success w-100"
                  type="submit"
                  onClick={() => navigate('/Shipping')}
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart