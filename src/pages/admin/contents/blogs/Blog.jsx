import React, { useState } from "react";
import Search from "../../../../components/admin/Search";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import TableBLog from "./TableBlog";
import ModalBlog from "./ModalBlog";
import logo2 from "../../../../assets/logo2.png";
const inner = {title : "" , imgUrl : logo2 , content:"", creatAt : new Date() };
function Blog() {
  const [open, setOpen] = useState(false);
  const [blog, setBlog] = useState(inner);
  const [error,setError] = useState(inner);
  const [upload,setUpload] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setBlog(inner);
    setError(inner);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleChangeInput = (e) => {
    setBlog({...blog, [e.target.name] : e.target.value })
}

const validation = () => {
    const newError = {} ;
    newError.title = blog.title ? "" : "Vui lòng nhập title" ;
    newError.imgUrl = blog.imgUrl ? "" : "Vui lòng thêm ảnh ";
    newError.content = blog.content ? "" : "Vui lòng nhập content ";
    setError(newError) ;
    return Object.values(newError).some(e => e !== "");
}

const addBlog  = async () => {
    if(validation()) {
      return;
     }
     setUpload(true);
     if(blog.id) {
      await updateDocument("blogs", blog);
     }else {
       await addDocument("blogs", blog);
     }
       setUpload(false);
       setBlog(inner);
       handleClose();
}

  return (
    <div className="m-5">
     <Search handleClickOpen={handleClickOpen} title={"List Categories"}/>
     <TableBLog handleClickOpen={handleClickOpen} blog={blog} setBlog={setBlog}/>
     <ModalBlog upload={upload} error={error} blog={blog} setBlog={setBlog} addBlog={addBlog} open={open} handleClose={handleClose} handleChangeInput={handleChangeInput} />
    </div>
  );
}

export default Blog;
