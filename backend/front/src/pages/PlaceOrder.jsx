import React, {useEffect} from 'react'
import checksteps from '../component/checksteps'
import { useSelector, useDispatch } from 'react-redux'
import { PROXY } from '../component/Constants/api'
import { useNavigate } from 'react-router-dom'
import  { createOrder } from '../component/slice/orderslice'
import { clearCart } from '../component/slice/cartslice'
// import { MEDIA_URL } from '../component/Constants/api'


const PlaceOrder = () => {
  const address = useSelector((state) => state.shipping.shippingInfo)
  const payment = useSelector((state) => state.payment.payments)
  // const clearCart = cartslice.reducer.clearCart
  // const clearOrder = orderslice.reducer.clearCart

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const order = useSelector((state) => state.order)
  const {error, loading, success, order: orderDetails} = order
  const items = cart.item
  const taxPrice = items.reduce((acc, item) => acc + item.price * item.quantity * 0.15, 0)
  const shippingPrice = items.reduce((acc, item) => acc + item.price * item.quantity > 5000 ? 0 : 500, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0) + taxPrice + shippingPrice
  const navigate = useNavigate()


const createOrderHandler = () => {
  if (!address || !payment || items.length === 0) {
    navigate('/cart');
    alert('Please complete shipping, payment, and cart information before placing an order.');
    return;
  }

  const orderData = {
  orderData: {
    orderItems: items.map(item => ({
      product: item._id,
      qty: item.quantity,
      price: Number(item.price)
    })),
    shippingAddress: {
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
      state: address.state,
      country: address.country
    },
    paymentMethod: payment, 
    itemsPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    shippingPrice,
    taxPrice,
    totalPrice
  }
};

dispatch(createOrder(orderData));

};

useEffect(() => {
  if (success) {
    console.log('order placed successfully');
    localStorage.setItem('cartItems', JSON.stringify([]));
    navigate(`/order/${orderDetails._id}/`);
    dispatch(clearCart());
  } else if (error) {
    console.log(error);
  } else {
    console.log('Order processing...');
  }
}, [success, error, navigate, dispatch, orderDetails]);
  return (
    <div className="container mt-4">
      {loading && <div className="alert alert-info">Processing your order...</div>}
      {error && <div className="alert alert-danger">{typeof error === 'object' ? error.detail || JSON.stringify(error) : error}</div>}
      {checksteps({ step1: true, step2: true, step3: true, step4: true })}

      <h2 className="mb-4 text-center">Place Order</h2>

      <div className="row">
        {/* Left Section */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header fw-bold">Shipping Address</div>
            <div className="card-body">
              <p className="mb-0">
                {address.address}, {address.city}, {address.postalCode}, {address.state}, {address.country}
              </p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header fw-bold">Payment Method</div>
            <div className="card-body">
              <p className="mb-0">{payment}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header fw-bold">Order Items</div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '80px', height: 'auto' }}
                          className="img-thumbnail"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>₦{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header fw-bold">Order Summary</div>
            <div className="card-body">
              <p>
                <strong>Total Items:</strong>{' '}
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p>
                <strong>Shipping Price:</strong>{' '}
                ₦{shippingPrice.toFixed(2)}
              </p>
              <p>
                <strong>Tax Price:</strong>{' '}
                ₦{taxPrice.toFixed(2)}
              </p>
              <p>
                <strong>Total Price:</strong>{' '}
                ₦{totalPrice.toFixed(2)}
              </p>
              <button className="btn btn-primary w-100 mt-3" onClick={() => createOrderHandler()}>Place Order</button>
            </div>
          </div>
        </div>
        </div>
    </div>
    )
}

export default PlaceOrder