import React,{useEffect,useState} from 'react'
import axios from 'axios'


const url = 'http://localhost:7700'


const Users = () => {
  const [users,setUsers]=useState([])
  const [selectedUser,setSelectedUser]=useState();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState()
  const [active,setActive]=useState('')
  // const [search,setSearch]= useState('')
  // const [Fdata,setData] = useState(data)
  useEffect(()=>{
    const fetchData=async()=>{
      const res = await axios.get(`${url}/users`)
      setUsers(res.data.data)
    }
    fetchData()
  },[])

  const renderEdit=(id)=>{
     axios.get(`${url}/users/${id}`).then(item=>{
       console.log(item.data.data)
      setSelectedUser(item.data.data)
      setName(item.data.data.name)
      setEmail(item.data.data.email)
      setRole(item.data.data.role)
      setActive(item.data.data.isActive)
     }) 
      
  }
  const renderDelete=async(id)=>{
      console.log(id)
      await axios.delete(`${url}/delete/${id}`) 
      await axios.get(`${url}/users`).then(item=>{  
         setUsers(item.data.data)  
          
        }) 
      // window.location.reload()
  }

  const nameChange=(e)=>{
      
      setName(e.target.value)
  }
  // const cityChange=(e)=>{
  //     setCity(e.target.value)
  // }
  // const phoneNoChange=(e)=>{
  //     setPhone(e.target.value)
  // }
  const emailChange=(e)=>{
      setEmail(e.target.value)
  }

  const updateFunction=(id)=>{
      console.log(name,role,active,email)

      axios.patch(`${url}/editusers/${id}`,{
          name:name,
          email:email,
          role:role,
          isActive:active,
          
      }).then((data)=>{
          console.log(data)
          axios.get(`${url}/users`).then(item=>{
            setUsers(item.data.data)  
          })
      })
     
  }

  const changeroleUser=(e)=>{
    setRole("Admin")
  }
  const changeroleAdmin=(e)=>{
    setRole("Admin")
  }
  const changeActive=(e)=>{
    setActive(!active)
  }

  const details=(users)=>{
    console.log("hj",users)
    return users.map(item=>{
      console.log(item.isActive)
      return(
        <>
        <tbody>
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>{item.isActive}</td>
            <td><span className='icon' onClick={()=>renderDelete(item._id)}><i  class="fas fa-trash-alt"></i></span> 
                  <span data-toggle="modal" data-target="#myModal" onClick={()=>renderEdit(item._id)}> <i class="fas fa-edit"></i></span>
                 </td>
          </tr>
        </tbody>
        {/* {selectedUser? */}
        <div class="modal" id="myModal">
              <div class="modal-dialog">
                  <div class="modal-content">
              
                      
                      <div class="modal-header">
                      <h4 class="modal-title">Edit User Detail</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
              
                     
                      <div class="modal-body">
                          <form id="update_user">
                              <input type="text" readonly disabled class="form-control" defaultValue={selectedUser._id}  id="update_id"  name="_id"/>
                              <div class="form-group">
                                  <label for="name">Name:</label>
                                  <input type="text" class="form-control" id="update_name" defaultValue={selectedUser.name} onChange={nameChange} placeholder="Enter First name" name="name" required/>
                              </div>
                         
                              <div class="form-group">
                                  <label for="email">Email:</label>
                                  <input type="email" class="form-control" id="update_email" defaultValue={selectedUser.email} onChange={emailChange} placeholder="Enter Email" name="email"/>
                              </div>
                              <div class="form-group" >
                                  <label for="role">Role:</label>
                                  <label class="radio-inline">
                                      <input type="radio" name="optradio" value='User' checked={selectedUser.role === role} onChange={changeroleUser}/>User
                                    </label>
                                    <label class="radio-inline">
                                      <input type="radio" name="optradio" value="Admin" checked={selectedUser.role === role} onChange={changeroleAdmin}/>Admin
                                    </label>
                              </div>
                              <div class="form-group" >
                                  <label for="role">IsActive:</label>
                                  <label class="radio-inline">
                                      <input type="radio" name="active" checked={selectedUser.isActive === active} onChange={changeActive} value="true"/>True
                                    </label>
                                    <label class="radio-inline">
                                      <input type="radio" name="active" checked={selectedUser.isActive === active} onChange={changeActive} value="false"/>False
                                    </label>
                              </div>
                              
                          </form>
            
                      </div>
              
                  
                      <div class="modal-footer">
                              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                              <button type="submit" id="update_table" class="btn btn-primary" onClick={()=>{updateFunction(selectedUser._id)}}>update</button>
                      </div>
                        
                  </div>
              </div>
          </div>
          {/* :<div></div>} */}
        </>
      ) 
    })
  }
  
  return (
    <div className='container'>
      <h2 >User Details</h2>
      <div class="table responsive ">
          <table class="table  table-hover table-striped" >
          <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {details(users)}
        </table>
        </div>
        </div> 
  )
}

export default Users
