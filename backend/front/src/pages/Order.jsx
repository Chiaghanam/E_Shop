import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PROXY } from '../component/Constants/api'
import { useNavigate } from 'react-router-dom'
import  { fetchOrderProfiles } from '../component/slice/orderprofileslice'
import { useParams } from 'react-router-dom'
import {fetchOrderIsPaid} from '../component/slice/isPaidslice'
import { orderDelivered } from '../component/slice/orderDeliveredslice'



const Order = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // selector for order profiles
  const orderProfile = useSelector((state) => state.orderProfile);
  const { orderProfiles: order, loading, error } = orderProfile;
  // sector for ispaid
  const orderIsPaid = useSelector((state) => state.isPaid);
  const { loading: payloading, success: paysuccess } = orderIsPaid;
  // section for order delivered
  const userInfo = useSelector((state) => state.login);
  const { userInfo: user } = userInfo;




   const [SdkReady, setSdkReady] = useState(false);
  const paypalRef = useRef();

  const addPaypalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypal.com/sdk/js?client-id=AS_v5h8RtJTU22baTF4bl8RpnLdYK6Gr4Lz_eaCNzSpP4lbsPy69_vNu2vvg5dqFBViB3Z7ydZCFphUO';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || paysuccess || order._id !== Number(_id)) {
      dispatch(fetchOrderProfiles(_id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, _id, paysuccess, order]);

  useEffect(() => {
    if (SdkReady && !order.isPaid) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.totalPrice.toString(), 
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const paymentResult = await actions.order.capture();
          successPaymentHandler(paymentResult);
        },
        onError: (err) => {
          console.error('PayPal Checkout Error:', err);
        },
      }).render(paypalRef.current);
    }
  }, [SdkReady, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(fetchOrderIsPaid(_id, paymentResult));
  };


  
  return (
   <div className="container mt-4">
      {loading && <div className="alert alert-info">Processing your order...</div>}
      {error && <div className="alert alert-danger">{typeof error === 'object' ? error.detail || JSON.stringify(error) : error}</div>}
      

      <h2 className="mb-4 text-center">Place Order</h2>

      <div className="row">
        {/* Left Section */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header fw-bold">Shipping Address</div>
            <div className="card-body">
              <p className="mb-0">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.state}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header fw-bold">Email</div>
            <div className="card-body">
              <p className="mb-0">
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header fw-bold">Payment Method</div>
            <div className="card-body">
              <p className="mb-0">{order.paymentMethod}</p>
            </div>

            <div className="card-header fw-bold">Payment Status</div>
            <div className="card-body">
              <p className="mb-0">{order?.isDelivered ? (
                  <div style={{color:"green"}}>Paid <br/>{order.paidAt} </div> 
                ) : (
                  <div style={{color:"red"}}>Not Paid</div>
                )}</p>
            </div>
            <div className="card-header fw-bold">Delivery Status</div>
            <div className="card-body">
              <p className="mb-0">{order?.isDelivered ? (
                  <div style={{color:"green"}}>Delivered <br/>{order.delieveredAt} </div> 
                ) : (
                  <div style={{color:"red"}}>Not Delivered</div>
                )}</p>
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
                  {order.orderitem.map((item) => (
                    <tr >
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
                {order.totalPrice}
              </p>
              <p>
                <strong>Shipping Price:</strong>{' '}
                ₦{order.shippingPrice}
              </p>
              <p>
                <strong>Tax Price:</strong>{' '}
                ₦{order.taxPrice}
              </p>
              <p>
                <strong>Total Price:</strong>{' '}
                ₦{order.totalPrice}
              </p>
              
            </div>
               {/* PayPal Button */}
              {!order.isPaid && (
                <div ref={paypalRef} style={{ marginTop: '20px' }}></div>
              )}
          </div>
            <div>
               {/* isdelivered Button */}
              {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                <button className="btn btn-success mt-2" onClick={() => dispatch(orderDelivered(order._id))}>
                  Mark as Delivered
                </button>
              )}
          </div>
        </div>
        </div>
    </div>
  )
}

export default Order
