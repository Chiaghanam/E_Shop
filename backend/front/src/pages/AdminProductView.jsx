import React, { useEffect } from 'react';
import { deleteproducts } from '../component/slice/deleteProductslice';  
import { fetchproduct } from '../component/slice/productslice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const AdminProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isloading, error } = useSelector((state) => state.products); 


// fetch products based on search keyword in the URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query"); 

  useEffect(() => {
    dispatch(fetchproduct(keyword));
  }, [dispatch, keyword]);

  const handledelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteproducts(_id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
            
          <h3 className="mb-0">Products</h3>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/admin/createproduct')}
          >
            <i className="bi bi-plus-circle me-1"></i> Add Product
          </button>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {isloading ? (
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
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Date Created</th>
                    <th colSpan="2" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>₦{product.price}</td>
                      <td>{product.countInStock}</td>
                      <td>{new Date(product.created_at).toLocaleDateString()}</td>
                      <td className="text-center">
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handledelete(product._id)}
                        >
                          <i className="bi bi-trash me-1"></i> Delete
                        </button>
                      </td>
                      <td className="text-center">
                        <button 
                          type="button" 
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/admin/editproduct/${product._id}`)}
                        >
                          <i className="bi bi-pencil-square me-1"></i> Edit
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
  );
};

export default AdminProductView;