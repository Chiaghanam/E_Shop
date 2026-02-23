import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createProduct, updateProduct, resetCreateUpdateProduct } from "../component/slice/createUpdateProduct";
import { fetchProductDetail } from "../component/slice/ProductDetailslice";
import { PROXY } from "../component/Constants/api";

const AdminProductForm = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.createUpdateProduct);
  const { product: productDetails } = useSelector((state) => state.productDetail);
  const { register, handleSubmit, reset } = useForm();

  // Fetch product details if editing
  useEffect(() => {
    if (_id) {
      dispatch(fetchProductDetail(_id));
    } else {
      dispatch(resetCreateUpdateProduct());
      reset({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: ''
      });
    }
  }, [_id, dispatch, reset]);

  // Reset form with product data if editing
  useEffect(() => {
    if (productDetails && _id) {
      reset(productDetails); // Populate form with product details for editing
    }
  }, [productDetails, _id, reset]);

  const onSubmit = (values) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("brand", values.brand);
  formData.append("category", values.category);
  formData.append("description", values.description);

  if (values.price !== undefined && values.price !== null) {
    formData.append("price", Number(values.price).toFixed(2));
  }

  formData.append("countInStock", values.countInStock);

  // If user uploads a new image, use it
 if (values.image && values.image[0]) {
    formData.append("image", values.image[0]);
}
for (let [key, value] of formData.entries()) {
    console.log(key, value);
}

  if (_id) {
    dispatch(updateProduct({ _id, formData }))
      .unwrap()
      .then(() => navigate("/admin/listproduct"));
  } else {
    dispatch(createProduct(formData))
      .unwrap()
      .then(() => navigate("/admin/listproduct"));
  }
};

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{_id ? "Update Product" : "Create Product"}</h5>
          <Link to="/admin/listproduct" className="btn btn-secondary btn-sm">Back</Link>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" {...register("name", { required: true })} />
              </div>

              <div className="mb-3">
                <label className="form-label">Brand</label>
                <input className="form-control" {...register("brand", { required: true })} />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <input className="form-control" {...register("category", { required: true })} />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" {...register("description", { required: true })} />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                   type="number"
                   step="0.01"
                   className="form-control"
                   {...register("price", { required: true, valueAsNumber: true })}
                  />

              </div>

              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" {...register("countInStock", { required: true })} />
              </div>

            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" {...register("image")} />
              {_id && productDetails?.image && (
                <div className="mt-2">
                  <img
                    src={productDetails.image}
                    alt="Current product"
                    style={{ width: "150px", borderRadius: "5px" }}
                  />
                  <small className="text-muted d-block">
                    Leave empty to keep current image
                  </small>
                </div>
              )}
            </div>


              <button type="submit" className="btn btn-primary w-100">
                {_id ? "Update Product" : "Create Product"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;