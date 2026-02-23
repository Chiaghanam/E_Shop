import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser, FetchUser } from '../component/slice/adminUpdateUser';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const AdminUpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, data: profile, error } = useSelector(
    (state) => state.adminUpdateUser
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  useEffect(() => {
    if (id) {
      dispatch(FetchUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [reset, profile]);

  const onSubmit = (formData) => {
    dispatch(UpdateUser({ id, data: formData }));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Update User Profile</h5>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/listuser')}
          >
            Back
          </button>
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
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  {...register('username', { required: 'Required' })}
                />
                {errors.username && (
                  <div className="text-danger">{errors.username.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  {...register('name', { required: 'Required' })}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...register('email', { required: 'Required' })}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_staff"
                  {...register('is_staff')}
                />
                <label htmlFor="is_staff" className="form-check-label">
                  Admin
                </label>
                {errors.is_staff && (
                  <div className="text-danger">{errors.is_staff.message}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {loading ? 'Updating user profile...' : 'Update Profile'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateUser;