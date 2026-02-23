import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SearchBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    if (data.query) {
      navigate(`/search?query=${data.query}`)
    } else {
      navigate(location.pathname)
    }
  }

  return (
    <Form 
      className="d-flex ms-auto my-2 my-lg-0" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-2"
        {...register('query')}
      />
      <Button variant="outline-primary" type="submit">
        Search
      </Button>
    </Form>
  )
}

export default SearchBar