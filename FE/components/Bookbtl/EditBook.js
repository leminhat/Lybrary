import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import bookService from "./book.service";
import GioHang from "./GioHang";

const EditBook = () => {
    const [book, setBook] = useState({
        tieude: "",
        tacgia: "",
        mota: "",
        ngayph: "",
        sotrang: "",
        theloai: "",
        danhgia: "",
        linkimg: ""

    });


    const [commentList, setCommentList] = useState([]);
    const [avg,setAvg] = useState([])
    const [comment, setComment] = useState({
        book_id: "",
        login_tk: "",
        cmt: "",
        star: ""
    })
    comment.book_id = book.id;
    comment.login_tk = localStorage.getItem("accessToken")

    const [giohang, setGioHang] = useState({
        book_id: "",
        login_tk: "",
        tieude: "",
        tacgia: "",
        linkimg: "",
        soluong: ""
    })
    giohang.book_id = book.id;
    giohang.login_tk = localStorage.getItem("accessToken");
    giohang.tieude = book.tieude;
    giohang.tacgia = book.tacgia;
    giohang.linkimg = book.linkimg;




    const data = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        if (data.id != 0) {
            bookService.getBookById(data.id)
                .then((res) => {
                    setBook(res.data)
                })
                .catch((err => {
                    console.log(err)
                }))

            axios.get("http://localhost:8080/comment/" + data.id)
                .then((res) => {
                    setCommentList(res.data)
                })
                .catch((err => {
                    console.log(err)
                }));
            
            axios.get("http://localhost:8080/avg")
                .then((res) => {
                    // console.log("avg",res.data)
                    setAvg(res.data)
                })
                .catch((err => {
                    console.log(err)
                }));
            

        }

    }, [commentList])

    const handleDelete = (id) => {
         if (
      window.confirm("Ban co muon xoa binh luan") ===
      true
    ) {
    
    axios.get("http://localhost:8080/deletecmt/"+id)
      .then((res) => {
        alert("Delete Sucessfully");
        
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("http://localhost:8080/comment/" + data.id)
      .then((res) => {
          setCommentList(res.data)
      })
      .catch((err => {
          console.log(err)
      }));
  }};
    

    const handleChangeCmt = (e) => {
        const value = e.target.value;
        setComment({ ...comment, [e.target.name]: value });
    };

    const handleChangeGioHang = (e) => {
        const value = e.target.value;
        setGioHang({ ...giohang, [e.target.name]: value });
    };


    const handleChange = (e) => {
        const value = e.target.value;
        setBook({ ...book, [e.target.name]: value });
    };

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        setBook({ ...book, [e.target.name]: file.name });
    };

    const addCmt = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/addcmt", comment)
            .then((res) => {
                alert("Da Nhan Xet Thanh Cong")
                // navigate("/")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const addGioHang = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8080/addgiohang2", giohang)
            .then((res) => {
               
            })
            .catch((error) => {
                console.log(error)
            });

        axios.post("http://localhost:8080/addgiohang", giohang)
            .then((res) => {
                alert("Da them vao gio hang Thanh Cong")
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            });

    }

    const handleClickEditBtn = (e) => {
        e.preventDefault();
        e.target.classList.add("hidden");
        const btnSave = document.getElementById("save-btn");
        const inputs = document.querySelectorAll("[disabled]");
        inputs.forEach((input) => input.removeAttribute("disabled"));
        btnSave.classList.remove("hidden");
    };


    const editBook = (e) => {

        e.preventDefault();
        if (data.id != 0) {
            if (
                window.confirm("Ban co muon cap nhat quyen sach nay khong") ===
                true
              ) {
            bookService.updateBook(data.id, book)

                .then((res) => {
                    alert("Da cap nhat thanh cong")
                    navigate("/")
                })
                .catch((error) => {
                    console.log(error)
                })}
        } else {
            if (
                window.confirm("Ban co muon them quyen sach nay khong") ===
                true
              ) {
            bookService
                .saveBook(book)
                .then((res) => {
                    if (res.data == "") {
                        alert("Them sach that bai, Da co sach co tieu de va tac gia nhu tren");
                    } else {
                        alert("Them sach thanh cong");
                        setBook({
                            tieude: "",
                            tacgia: "",
                            mota: "",
                            ngayph: "",
                            sotrang: "",
                            theloai: "",
                            danhgia: "",
                            linkimg: ""
                        });
                        navigate('/')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });}
        }
    }
    console.log(commentList)



    return (
        <div>

            <form id="formAction" className="mx-8" onSubmit={editBook}>



                <div className="space-y-12 w-full h-full bg-white rounded-lg mt-8">

                    <div className="border-b border-gray-900/10 py-4">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mx-8 lg:grid-cols-2">
                            <div className="flex flex-col">
                                <div className="flex ">
                                    <div className="mr-4 w-1/2">
                                        <label
                                            htmlFor="tieude"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Tiêu đề (*)
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="tieude"
                                                    id="tieude"
                                                    className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Tiêu đề"
                                                    value={book.tieude}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={data.id !== "0" ? true : false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label
                                            htmlFor="tacgia"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Tác giả (*)
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="tacgia"
                                                    id="tacgia"
                                                    className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Tác giả"
                                                    value={book.tacgia}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={data.id !== "0" ? true : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="mota"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Mô tả về sách
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="mota"
                                            rows="4"
                                            name="mota"
                                            className="disabled:cursor-not-allowed block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                            value={book.mota}
                                            onChange={handleChange}
                                            placeholder="Thêm mô tả cho sách"
                                            disabled={data.id !== "0" ? true : false}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/2 mr-4">
                                        <label
                                            htmlFor="ngayph"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Ngày phát hành (*)
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="date"
                                                    name="ngayph"
                                                    id="ngayphathanh"
                                                    className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Ngày phát hành"
                                                    value={book.ngayph}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={data.id !== "0" ? true : false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label
                                            htmlFor="sotrang"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Số trang
                                        </label>
                                        <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="number"
                                                id="sotrang"
                                                name="sotrang"
                                                className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                required
                                                min={1}
                                                max={999}
                                                step={1}
                                                onChange={handleChange}
                                                placeholder="Số trang"
                                                value={book.sotrang}
                                                disabled={data.id !== "0" ? true : false}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="theloai"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Thể loại (*)
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <select
                                                type="text"
                                                name="theloai"
                                                id="theloai"
                                                className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                                placeholder="Thể loại"
                                                value={book.theloai}
                                                onChange={handleChange}
                                                required
                                                disabled={data.id !== "0" ? true : false}
                                            >
                                                <option value="" hidden>
                                                    -- Chọn thể loại --
                                                </option>
                                                <option value="Trinh Thám">Trinh Thám</option>
                                                <option value="Ngôn Tình">Ngôn tình</option>
                                                <option value="Phiêu Lưu">Phiêu lưu</option>
                                                <option value="Tình Cảm">Tình cảm</option>
                                                <option value="Tâm Lý">Tâm lý</option>
                                                <option value="Tiểu Thuyết">Tiểu Thuyết</option>
                                                <option value="Tài Liệu Tham Khảo">
                                                    Tài Liệu Tham Khảo
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center overflow-hidden">
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input
                                        onChange={handleChangeImg}
                                        disabled={data.id !== "0" ? true : false}
                                        type="file"
                                        name="linkimg"
                                        className="disabled:cursor-not-allowed cursor-pointer block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100
                                    "
                                    />
                                </label>
                                <div className="max-h-full justify-center flex">
                                    <img
                                        id="book-card-img"
                                        className="min-h-300 max-h-80 object-cover"
                                        src={`../images/${book.linkimg}`}
                                        alt="Book Card"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6 mr-24">
                            {localStorage.getItem("accessTokenad") && (
                                (
                                    <button
                                        type="button"

                                        className="text-sm font-semibold leading-6 text-gray-900 px-8"
                                    >
                                        Cancel
                                    </button>
                                ) && data.id !== "0" ? (
                                    <div>
                                        <button
                                            onClick={handleClickEditBtn}
                                            type="button"
                                            className="px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            id="save-btn"
                                            type="submit"
                                            className="hidden px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add
                                    </button>
                                )
                            )
                            }
                        </div>
                    </div>
                </div>

            </form>

            {localStorage.getItem("accessToken") &&(
            <form id="formAddgiohang" onSubmit={(e) => addGioHang(e)}>

                <div className="mb-3 row">
                    <label htmlFor="cmt" className="col-sm-2 col-form-label">
                        So Luong <br />
                    </label>

                    <div className="col-sm-4 muahang">
                        <input
                            className="form-control"
                            type="number"
                           
                            name="soluong"
                            id="soluong"
                            onChange={(e) => handleChangeGioHang(e)}
                        />
                        <button type="submit button" className="btn btn-primary">Mua Hang</button>    
                     </div>

                        
                    
                </div>
            </form>)}

            {localStorage.getItem("accessToken") &&(
            <form id="formAddCmt" onSubmit={(e) => addCmt(e)}>

                <div className="mb-3 row">
                <label htmlFor="cmt" className="col-sm-2 col-form-label">
                        Danh Gia <br />
                    </label>

                    <div className="col-sm-4 muahang">
                        <input
                            className="form-control"
                            type="number"
                            min={1}
                            max={5}
                            step={1}
                            name="star"
                            id="star"
                            onChange={(e) => handleChangeCmt(e)}
                        />
                        <button type="submit button" className="btn btn-primary">Danh Gia</button>  
                        <h1 className="avgstar">({avg}/5)</h1> 
                     </div>
                     
                </div>
                
                <div className="mb-3 row">

                    <label htmlFor="cmt" className="col-sm-2 col-form-label">
                        Comment <br />
                    </label>

                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            name="cmt"
                            id="cmt"
                            onChange={(e) => handleChangeCmt(e)}
                        />
                    </div>
                </div>

                <button type="submit button" className="btn btn-primary">Add Comment</button>
            </form>
            )}

            
            {commentList.map((cmt) => (
                <div key={cmt.id}>
                    <div className="container my-1 py-1 text-dark" >
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8 col-lg-5 col-xl-5">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex flex-start">
                                            <img className="rounded-circle shadow-1-strong me-3"
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                                                height="40" />
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h6 className="text-primary fw-bold mb-0">
                                                        {cmt.login_tk}
                                                        <span className="text-dark ms-2">{cmt.cmt}</span>
                                                    </h6>
                                                    {(localStorage.getItem("accessToken") == cmt.login_tk) && (
                                                    <button data-id={cmt.id} onClick={() => handleDelete(cmt.id) } className="btn btn-danger">Delete</button>
                                                    )}  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
        </div> 
    );
};


export default EditBook;