import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchUpdateProfile from '../component/slice/updateProfile'
import { useForm } from 'react-hook-form'


const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.login)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
    }
  })
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.updateProfile)

  const onUpdate = (data) => {
    if (data.password !== data.confirm_password) {
      alert("Passwords do not match")
      return
    }
    dispatch(fetchUpdateProfile(data))
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Update Profile</h4>
            </div>
            <div className="card-body">
              {loading && <div className="alert alert-info">Loading...</div>}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  Updated changes successfully!
                </div>
              )}

              <form onSubmit={handleSubmit(onUpdate)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    {...register("confirm_password")}
                    className="form-control"
                    placeholder="Re-enter your password"
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile