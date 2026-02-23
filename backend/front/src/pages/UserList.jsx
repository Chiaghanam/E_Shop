import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchusers } from '../component/slice/getUserslice';
import { deleteusers} from '../component/slice/deleteUserslice';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';


const UserList = () => {
    const{users, loading, error } = useSelector((state) => state.getusers) ;
    const userInfo = useSelector((state) => state.login.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();


     useEffect(()=>{
        if(userInfo?.is_staff){
            dispatch(fetchusers())
        }else{
            navigate('/');
        }
      },[userInfo, dispatch, navigate]);

    const handleDelete = (id) =>{
        if(window.confirm('Are you sure you want to delete this user ?')){
            dispatch(deleteusers(id))
            console.log(`deleted user ${id} successfully`)
        }
        
    }
  return (
     <div className="mt-4">
         <h2 className="mb-3">Users</h2>
   
         {loading && (
           <div className="d-flex justify-content-center">
             <Spinner animation="border" variant="primary" />
           </div>
         )}
   
         {error && <Alert variant="danger">{error}</Alert>}
   
         {!loading && !error && users?.length > 0 ? (
           <Table striped bordered hover responsive>
             <thead>
               <tr>
                 <th>ID</th>
                 <th>Username</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Staff</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {users.map((user) => (
                 <tr key={user.id}>
                   <td>{user.id}</td>
                   <td>{user.username}</td>
                   <td>{user.name}</td>
                   <td>
                     {user.email}
                   </td>
                   <td>
                     {user.is_staff ? (
                       <span className="text-success">
                        staff
                       </span>
                     ) : (
                       <span className="text-warning">Not Staff</span>
                     )}
                   </td>
                   <td>
                     <Button
                       variant="'danger'"
                       size="sm"
                       onClick={() => handleDelete(user.id)}
                     >
                       Delete
                     </Button>
                     <Button
                       variant="info"
                       size="sm"
                       onClick={() => navigate(`/user/edit/${user.id}/`)}
                     >
                       Edit
                     </Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </Table>
         ) : (
           !loading && <Alert variant="info">No orders found.</Alert>
         )}
       </div>
  )
}

export default UserList
