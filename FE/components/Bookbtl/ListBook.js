import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import bookService from "./book.service";
const ListBook = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);

  
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    bookService
      .getAllBook()
      .then((res) => {
        console.log("book",res.data)
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBook = (id) => {
    if (
      window.confirm("Ban co muon xoa quyen sach nay khong") ===
      true
    ) {
    bookService
      .deleteBook(id)
      .then((res) => {
        alert("Delete Sucessfully");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  }};
  if(!localStorage.getItem("accessToken") &&!localStorage.getItem("accessTokenad" )){
    navigate('/homelogin')
} 
else{

  return (
    <div className="container">
      <h1 className="text-centermt-3">List Book</h1>
      {localStorage.getItem("accessTokenad") && 
      (<Link to="/editbook/0" className="btn btn-success" >Add Book</Link>)}
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">Anh Bia</th>
            <th scope="col">Tieu De</th>
            <th scope="col">Tac Gia</th>
            <th scope="col">So Trang</th>
            <th scope="col">The Loai</th>
            <th scope="col">Da Ban</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          { 
          bookList.map((e, num) => (

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
              <td>{e.sotrang}</td>
              <td>{e.theloai}</td>
              <td>{e.daban}</td>
              <td>
                  { localStorage.getItem("accessTokenad") && (
                <Link to={"/editbook/" + e.id} className="btn btn-sm btn-primary">
                  Edit
                </Link>
                )} 
                { localStorage.getItem("accessToken") && (
                  <Link to={"/editbook/" + e.id} className="btn btn-sm btn-primary">
                  View
                </Link>
                ) } 
                {localStorage.getItem("accessTokenad") && (
                <a
                  onClick={() => deleteBook(e.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );}
          
};

export default ListBook;