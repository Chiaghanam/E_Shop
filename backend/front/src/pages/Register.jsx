import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../component/slice/registerslice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error, userInfo, success} = useSelector((state) => state.register)

    const onregister = (data) => {
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match!");
            return;
        }else{
            dispatch(registerUser(data));
        }
    }

    useEffect(() => {
      if (success) {
        navigate('/login');
      }
    }, [success, navigate]);

  return (
<div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>
    <h2 className="text-center mb-4">Register</h2>

    {loading && <p className="text-center text-muted">Loading...</p>}

    {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit(onregister)}>
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
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          id="username"
          {...register("username")}
          className="form-control"
          placeholder="Choose a username"
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
        Register
      </button>
    </form>

    <p className="text-center mt-3 mb-0">
      Have an account? <Link to="/login" className="text-decoration-none">Login</Link>
    </p>
  </div>
</div>
  )
}

export default Register
