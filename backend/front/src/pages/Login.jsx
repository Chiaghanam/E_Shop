import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '../component/slice/loginslice'
import { useSelector } from 'react-redux'
// import { pending, fulfilled, rejected } from '../component/slice/loginslice'


const Login = () => {
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, userInfo} = useSelector((state) => state.login)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const onSubmit = (data) => {
    dispatch(fetchUserInfo(data));
  }

  return (
  <div className="container mt-5" style={{ maxWidth: "400px" }}>
  {loading && <p className="text-center text-muted">Loading...</p>}
  
  {error && (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm">
    <h3 className="text-center mb-4">Login</h3>

    <div className="mb-3">
      <label htmlFor="username" className="form-label">Email</label>
      <input
        {...register("username")}
        id="username"
        type="email"
        className="form-control"
        placeholder="Enter your email"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        {...register("password")}
        id="password"
        type="password"
        className="form-control"
        placeholder="Enter your password"
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">
      Login
    </button>
  </form>

  <p className="text-center mt-3">
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</div>
  )
}

export default Login
