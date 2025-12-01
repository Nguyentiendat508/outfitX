import React, { useState } from "react";
import Search from "../../../../components/admin/Search";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import TableBrands from "./TableBrands";
import ModalBrands from "./ModalBrands";
import logo2 from "../../../../assets/logo2.png";
const inner = {name : "" , description : "", creatAt : new Date() ,   imgUrl : logo2  };
function Brands() {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState(inner);
  const [error,setError] = useState(inner);
  const [upload,setUpload] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setBrand(inner);
    setError(inner);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleChangeInput = (e) => {
    setBrand({...brand, [e.target.name] : e.target.value })
}

const validation = () => {
    const newError = {} ;
    newError.name = brand.name ? "" : "Vui long nhap name" ;
    newError.description = brand.description ? "" : "vui long nhap description";
    setError(newError) ;
    return Object.values(newError).some(e => e !== "");
}

const addBrands  = async () => {
    if(validation()) {
      return;
     }
     setUpload(true);
     if(brand.id) {
      await updateDocument("brands", brand);
     }else {
       await addDocument("brands", brand);
     }
       setUpload(false);
       setBrand(inner);
       handleClose();
}

  return (
    <div className="m-5">
     <Search handleClickOpen={handleClickOpen} title={"List Categories"}/>
     <TableBrands handleClickOpen={handleClickOpen} brand={brand} setBrand={setBrand}/>
     <ModalBrands upload={upload} error={error} brand={brand} setBrand={setBrand} addBrands={addBrands} open={open} handleClose={handleClose} handleChangeInput={handleChangeInput} />
    </div>
  );
}

export default Brands;
