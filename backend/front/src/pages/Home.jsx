import React from 'react';
// import { useEffect } from 'react';
// import Header from '../../../front/src/component/Header';
// import Footer from '../../../front/src/component/Footer';
import { fetchproduct } from '../component/slice/productslice';  
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// import { PROXY } from '../component/Constants/api';
// import { MEDIA_URL } from '../component/Constants/api';
import StarRating from '../component/StarRating';
import { useLocation } from 'react-router-dom';
import TopProductCourosel from '../component/TopProductCourosel';
const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query"); 

  console.log(keyword);


  const dispatch = useDispatch();
  const { data, isloading, error } = useSelector((state) => state.products); 
  const userInfo = useSelector((state) => state.login.userInfo);

  useEffect(() => {
    dispatch(fetchproduct(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {/* <Header /> */}
      <main>
        <div className="container mt-4 text-center">
          <h1>Welcome {userInfo?.name || ''}</h1>
          <p>Your one-stop shop for all your needs!</p>

          {!keyword && <TopProductCourosel />}
          {isloading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="row">
                {data && data.map((product) => (
                  <div key={product._id} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <Link to={`/product/${product._id}`}>
                      <div className="card">
                        <img src={product.image} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <StarRating rating={product.rating} />
                          <p className="card-text">Price: ₦{product.price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;