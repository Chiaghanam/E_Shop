import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../component/slice/myOrderslice';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const OrderList = () => {
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.myOrders);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userInfo) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">My Orders</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && orders?.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <span className="text-success">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-danger">Not Paid</span>
                  )}
                </td>
                <td>
                  {order.isDelievered ? (
                    <span className="text-success">
                      Delivered on {new Date(order.delieveredAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-warning">Not Delivered</span>
                  )}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => navigate(`/order/${order._id}/`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && <Alert variant="info">No orders found.</Alert>
      )}
    </div>
  );
};

export default OrderList;