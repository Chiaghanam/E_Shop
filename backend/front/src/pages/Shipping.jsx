import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setShippingInfo } from '../component/slice/shippingslice'
import checksteps from '../component/checksteps'

const Shipping = () => {
  const info = useSelector((state) => state.shippingInfo || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onshipping = (data) => {
    console.log("Shipping Data:", data)
    dispatch(setShippingInfo(data))
    navigate('/Payment')
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: info.address || "",
      city: info.city || "",
      postalCode: info.postalCode || "",
      state: info.state || "",
      country: info.country || "",
    }
  })

  return (
    <div className="container mt-4">
      {checksteps({ step1: true, step2: true })}

      <h2 className="text-center mb-4">Shipping Information</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit(onshipping)}>
                {/* Address */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    required
                    type="text"
                    id="address"
                    {...register("address")}
                    className="form-control"
                    placeholder="Enter your address"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    required
                    type="text"
                    id="city"
                    {...register("city")}
                    className="form-control"
                    placeholder="Enter your city"
                  />
                </div>

                {/* Postal Code */}
                <div className="mb-3">
                  <label htmlFor="postalCode" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    {...register("postalCode")}
                    className="form-control"
                    placeholder="Enter your postal code"
                  />
                </div>

                {/* State */}
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    required
                    type="text"
                    id="state"
                    {...register("state")}
                    className="form-control"
                    placeholder="Enter your state"
                  />
                </div>

                {/* Country */}
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    required
                    type="text"
                    id="country"
                    {...register("country")}
                    className="form-control"
                    placeholder="Enter your country"
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">
                  Done
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shipping