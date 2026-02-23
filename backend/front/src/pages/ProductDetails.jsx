import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../component/slice/ProductDetailslice';
import { PROXY } from '../component/Constants/api'
import { addToCart } from '../component/slice/cartslice';
import StarRating from '../component/StarRating';
import { useForm } from 'react-hook-form'
import { createReview, resetReview } from '../component/slice/reviewslice';
// import { MEDIA_URL } from '../component/Constants/api';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetail);
    const { loading: reviewLoading, error: reviewError, success } = useSelector((state) => state.review);
    const { id } = useParams();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            rating: '1',
            comment: '',
        }
    });

    useEffect(() => {
        dispatch(fetchProductDetail(id))
    }, [id, dispatch]);

    useEffect(() => {
        if (success) {
            alert('Review submitted successfully!');
            reset();
            dispatch(resetReview()); 
            dispatch(fetchProductDetail(id));
        }
    }, [success, dispatch, reset, id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }
    
    // Create review handler
    const onSubmitReview = (data) => {
        console.log('Form data:', data);
        
        const reviewData = {
            rating: parseInt(data.rating),
            comment: data.comment
        };
        
        console.log('Sending review:', reviewData); 
        dispatch(createReview({ id: id, reviewData }));
    }

    return (
        <div className="container my-4">
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
            ) : product ? (
                <>
                    {/* Product Details Section */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-5">
                            <div className="card border-0 shadow-sm">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="card-img-top rounded"
                                    style={{ objectFit: 'cover', maxHeight: '400px' }}
                                />
                                <div className="card-body">
                                    <h2 className="card-title mb-3">{product.name}</h2>
                                    <div className="mb-3">
                                        <StarRating rating={product.rating || 0} size={20} showRating />
                                    </div>
                                    <h3 className="text-primary mb-0">
                                        ₦{product.price ? product.price.toLocaleString() : '0'}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h4 className="card-title mb-3">Description</h4>
                                    <p className="card-text text-muted">
                                        {product.description || 'No description available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <h5 className="mb-2">Status:</h5>
                                        {product.countInStock > 0 ? (
                                            <span className="badge bg-success fs-6">In Stock</span>
                                        ) : (
                                            <span className="badge bg-danger fs-6">Out of Stock</span>
                                        )}
                                    </div>
                                    
                                    {product.countInStock > 0 && (
                                        <div className="mb-3">
                                            <small className="text-muted">
                                                {product.countInStock} units available
                                            </small>
                                        </div>
                                    )}

                                    <button 
                                        className={`btn w-100 ${product.countInStock > 0 ? 'btn-primary' : 'btn-secondary'}`}
                                        type="button" 
                                        onClick={handleAddToCart}
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">Customer Reviews</h3>
                                    
                                    {!product.Review || product.Review.length === 0 ? (
                                        <div className="alert alert-info" role="alert">
                                            No reviews yet. Be the first to review this product!
                                        </div>
                                    ) : (
                                        <div>
                                            {product.Review.map((review, index) => (
                                                <div key={review._id || index} className="mb-3 pb-3 border-bottom">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <strong>{review.name || 'Anonymous'}</strong>
                                                        <StarRating rating={review.rating || 0} size={16} />
                                                    </div>
                                                    <p className="text-muted mb-0">
                                                        {review.comment || 'No comment'}
                                                    </p>
                                                    {review.created_at && (
                                                        <small className="text-muted">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </small>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Write Review Form */}
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title mb-4">Write a Review</h3>
                                    
                                    {reviewError && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {reviewError}
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => dispatch(resetReview())}
                                            ></button>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            Review submitted successfully!
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => dispatch(resetReview())}
                                            ></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit(onSubmitReview)}>
                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">
                                                Rating <span className="text-danger">*</span>
                                            </label>
                                            <select 
                                                id="rating" 
                                                className={`form-select ${errors.rating ? 'is-invalid' : ''}`}
                                                {...register("rating", { 
                                                    required: "Please select a rating" 
                                                })}
                                            >
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                            {errors.rating && (
                                                <div className="invalid-feedback">
                                                    {errors.rating.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="comment" className="form-label">
                                                Comment <span className="text-danger">*</span>
                                            </label>
                                            <textarea 
                                                id="comment" 
                                                className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                                                rows="4"
                                                placeholder="Share your experience with this product..."
                                                {...register("comment", { 
                                                    required: "Please write a comment",
                                                    minLength: {
                                                        value: 10,
                                                        message: "Comment must be at least 10 characters"
                                                    }
                                                })}
                                            ></textarea>
                                            {errors.comment && (
                                                <div className="invalid-feedback">
                                                    {errors.comment.message}
                                                </div>
                                            )}
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="btn btn-primary w-100"
                                            disabled={reviewLoading}
                                        >
                                            {reviewLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Review'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    No product found.
                </div>
            )}
        </div>
    );
}

export default ProductDetails;