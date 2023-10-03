import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import bookService from "./book.service";
import axios from "axios";
const GioHang = () => {
    const navigate = useNavigate();
    const[giohangList,setGiohangList] =useState([]);
    
  
  useEffect(() => {
    init();
  }, []);

  const init = () => {

        axios.get("http://localhost:8080/giohang/" + localStorage.getItem("accessToken"))
      .then((res) => {
        
        setGiohangList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGioHang = (id) => {
      axios.get("http://localhost:8080/deletegiohang/" + id)
      .then((res) => {
        alert("Delete Sucessfully");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if(!localStorage.getItem("accessToken")){
    navigate('/homelogin')
} 
else{
    console.log(giohangList);
  return (  
    <div className="container">
      <h1 className="text-centermt-3">Nhung Quyen Sach Da Mua</h1>
      
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">Anh Bia</th>
            <th scope="col">Tieu De</th>
            <th scope="col">Tac Gia</th>
            <th scope="col">So Luong</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          { giohangList.length &&
          giohangList.map((e, num) => (

            <tr key={e.id}>
              <th scope="row">
              <div className="max-h-full justify-center flex">
                                    <img
                                        id="book-card-img"
                                        className="min-h-300 max-h-80 object-cover"
                                        src={`../images/${e.linkimg}`}
                                        alt="Book Card"
                                    />
                                </div>  
              </th>
              <td>{e.tieude}</td>
              <td>{e.tacgia}</td>
              <td>{e.soluong}</td>
              <td>
                 
                 
                  <Link to={"/editbook/" + e.book_id} className="btn btn-sm btn-primary">
                  View
                 </Link>
                
               
                <a
                  onClick={() => deleteGioHang(e.id)}
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

export default GioHang;