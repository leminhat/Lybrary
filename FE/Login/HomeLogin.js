import React from "react";
import { useState } from "react";
import loginService from "./login.service";
import { Link, useNavigate } from "react-router-dom";

const HomeLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    tk: "",
    mk: "",
    name: "",
    quyen:"",
    giohang: "",
   
  });
  

  const handleChange = (e) => {
    const value = e.target.value;
    setLogin({ ...login, [e.target.name]: value });
  };

  const submitLogin = (e) => {
    e.preventDefault();

    loginService
      .saveDangNhap(login)
      .then((res) => {
        console.log(res.data)
          if(res.data==""){
          alert("Sai Tai Khoan hoac Mat Khau");       
      } else{
          alert("Dang nhap thanh cong");
          
          
          if(res.data.quyen!="admin"){  localStorage.setItem("accessToken", login.tk);}
          if(res.data.quyen=="admin"){  localStorage.setItem("accessTokenad", login.tk);}
          console.log("1", res.data.quyen)
          console.log("2",localStorage.getItem("accessTokenad", login.tk))
          navigate('/')
          setLogin({
              tk: "",
              mk: "",
              name: "",
              quyen:"",
              giohang: "",
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
               Login
             
            </div>

            <div className="card-bodylogin">
              <form onSubmit={(e) => submitLogin(e)}>
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
                <div className="text-center">
                  <button className="btn btn-success" type="submit" >Dang Nhap</button>            
                </div> 
                <Link to ="/editlogin/0" className="chudangky">Ban chua co tai khoan? Dang ky ngay</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;