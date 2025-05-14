import React, { useContext, useEffect } from 'react'
import Ct from './Context'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    Cookies.remove("lc")
    obj.stateupdate({"token":"", "uid":"", "role": "", "name":""})
    navigate("/")
  })
  return (
    <div>
       
    </div>
  )
}

export default Logout
