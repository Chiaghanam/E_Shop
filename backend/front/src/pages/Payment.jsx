import React from 'react'
import checksteps from '../component/checksteps'
import { useDispatch } from 'react-redux'
import { paymentMethod } from '../component/slice/paymentslice'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePaymentMethod = (data) => {
    console.log("Payment Method Data:", data)
    dispatch(paymentMethod(data.paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className="container mt-4">
      {checksteps({ step1: true, step2: true, step3: true })}

      <h2 className="mb-4 text-center">Choose Payment Method</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit(handlePaymentMethod)}>
                {/* PayPal */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="paypal"
                    value="paypal"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>

                {/* Credit Card */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="creditCard"
                    value="creditcard"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label className="form-check-label" htmlFor="creditCard">
                    Credit Card
                  </label>
                </div>

                {/* Pay on Delivery */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="payOnDelivery"
                    value="pay on delivery"
                    {...register("paymentMethod", { required: true })}
                  />
                  <label className="form-check-label" htmlFor="payOnDelivery">
                    Pay on Delivery
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment