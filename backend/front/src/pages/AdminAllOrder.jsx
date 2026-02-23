import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FetchOrders } from '../component/slice/adminAllOrderslice';

const AdminAllOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, loading, error } = useSelector((state) => state.adminAllOrders);
    useEffect(() => {
        try {
            dispatch(FetchOrders());
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }, [dispatch]);
    console.log( error);
  return (
   <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Orders</h3>
       
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Payment Method</th>
                    <th>Total Price</th>
                    <th>paid</th>
                    <th>Date paid</th>
                    <th>Delivered</th>
                    <th>Delivered Date</th>
                    <th>Date Ordered</th>
                    <th>Details</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.name}</td>
                      <td>{order.paymentMethod}</td>
                      <td>₦{order.totalPrice}</td>
                      <td>{order.isPaid ? 'Yes' : 'No'}</td>
                      <td>{order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'N/A'}</td>
                      <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                      <td>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'N/A'}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="text-center">
                        <button 
                          type="button" 
                          className="btn btn-info btn-sm"
                          onClick={() => navigate(`/order/${order._id}`)}
                        >
                          <i className="bi bi-eye me-1"></i> View
                        </button>
                        </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAllOrder
