import React, { useEffect } from "react";
import { useState } from "react";
import loginService from "./login.service";
import { useNavigate, useParams } from "react-router-dom";

const EditLogin = () => {
  const [login, setLogin] = useState({
    tk: "",
    mk: "",
    name: "",
    quyen:"",
    giohang: "",
   
  });
  
  const data = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    if(data.id!=0){
    loginService.getLoginById(data.id)
    .then((res) => {
        setLogin(res.data)
    })
    .catch((err =>{
        console.log(err)
    }))
    }

  },[])
  


  const handleChange = (e) => {
    const value = e.target.value;
    setLogin({ ...login, [e.target.name]: value });
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    setLogin({ ...login, [e.target.name]: file.name});
  };


  const editLogin = (e) => {
    e.preventDefault();
    if(data.id!=0){
      if (
        window.confirm("Ban co muon cap nhat User nay") ===
        true
      ) {
    loginService.updateLogin(data.id,login)
    
    .then((res) =>{
        alert("Da cap nhat thanh cong")
        navigate("/logins")
    })
    .catch((error) =>{
        console.log(error)
    })}
    } else{
      if (
        window.confirm("Ban co muon dang ki tai khoan nay") ===
        true
      ) {
      loginService
      .saveLogin(login)
      .then((res) => {
          if(res.data==""){
          alert("Dang ki tai khoan that bai, ten dang nhap da ton tai");       
      } else{
          alert("Dang ki tai khoan thanh cong");
          setLogin({
              tk: "",
              mk: "",
              name: "",
              quyen:"",
              giohang: "",
          });
          navigate('/logins')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }}
}


  return (
    
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            {data.id==0 ? (
            <div className="card-header text-center fs-3">
              Dang Ky
            </div>
            ) : (
              <div className="card-header text-center fs-3">
              Quan Ly User
              </div>
            )}
            <div className="card-body">
              <form onSubmit={(e) => editLogin(e)}>
                <div className="mb-3">
                  <label>Nhap Tai Khoan</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tk"
                    value={login.tk}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>Nhap Mat Khau</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mk"
                    value={login.mk}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>Nhap ten </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={login.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {localStorage.getItem("accessTokenad") && (
                   <div className="mb-3">
                  <label>Nhap Quyen</label>
                  <input
                    type="text"
                    className="form-control"
                    name="quyen"
                    value={login.quyen}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                )}

                
                <div className="text-center">
                  <button className="btn btn-success">Submit</button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditLogin;