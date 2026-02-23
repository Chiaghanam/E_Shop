import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { fetchtopproduct } from './slice/topProductslice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { MEDIA_URL } from './Constants/api'

const TopProductCourosel = () => {
  const dispatch = useDispatch()
  const { data, isloading, error } = useSelector((state) => state.topProducts)

  useEffect(() => {
    dispatch(fetchtopproduct())
  }, [dispatch])

  return (
    <div className="d-flex justify-content-center my-4">
      <div className="w-75 shadow rounded overflow-hidden">
        {isloading ? (
          <p>Loading top products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Carousel variant="dark" interval={3000} indicators={false}>
            {data &&
              data.map((product) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      className="d-block mx-auto img-fluid"
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                      alt={product.name}
                    />
                    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                      <h5 className="text-white">{product.name}</h5>
                      <p className="text-light">₦{product.price}</p>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default TopProductCourosel