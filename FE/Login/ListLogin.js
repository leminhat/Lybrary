import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import loginService from "./login.service";
const ListLogin = () => {
  const navigate = useNavigate();
  const [loginList, setLoginList] = useState([]);

  
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    loginService
      .getAllLogin()
      .then((res) => {
        
        setLoginList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLogin = (id) => {
    if (
      window.confirm("Ban co muon xoa user nay khong") ===
      true
    ) {
    loginService
      .deleteLogin(id)
      .then((res) => {
        alert("Delete Sucessfully");
        init();
      })
      .catch((error) => {
        console.log(error);
      });}
  };
  if(!localStorage.getItem("accessTokenad")){
    navigate('/')
} 
else{

  return (
    <div className="container">
      <h1 className="text-centermt-3">List User</h1>
      
      <Link to="/editlogin/0" className="btn btn-success" >Add User</Link>
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tai Khoan</th>
            <th scope="col">Mat Khau</th>
            <th scope="col">Ten</th>
            <th scope="col">Quyen</th>
            
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loginList.map((e, num) => (
            <tr key={e.id}>
              <th scope="row">{num + 1}</th>
              <td>{e.tk}</td>
              <td>{e.mk}</td>
              <td>{e.name}</td>
              <td>{e.quyen}</td>
              
              <td>
                <Link to={"/editlogin/" + e.id} className="btn btn-sm btn-primary">
                  Edit
                </Link>
                <a
                  onClick={() => deleteLogin(e.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );}
          
};

export default ListLogin;