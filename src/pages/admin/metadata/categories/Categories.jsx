import React, { useState } from "react";
import TableCategory from "./TableCategory";
import Search from "../../../../components/admin/Search";
import ModalCategory from "./ModalCategory";
import { addDocument, updateDocument } from "../../../../services/firebaseService";

const inner = {name : "" , description : "", creatAt : new Date()};
function Categories() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(inner);
  const [error,setError] = useState(inner);


  const handleClickOpen = () => {
    setOpen(true);
    setCategory(inner);
    setError(inner);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleChangeInput = (e) => {
    setCategory({...category, [e.target.name] : e.target.value })
}

const validation = () => {
    const newError = {} ;
    newError.name = category.name ? "" : "Vui long nhap name" ;
    newError.description = category.description ? "" : "vui long nhap description";
    setError(newError) ;
    return Object.values(newError).some(e => e !== "");
}

const addCategory  = async () => {
    if(validation()) {
      return;
     }
     if(category.id) {
      await updateDocument("categories", category);
     }else {
       await addDocument("categories", category);
     }
       setCategory(inner);
       handleClose();
}

  return (
    <div className="m-5">
     <Search handleClickOpen={handleClickOpen} title={"List Categories"}/>
     <TableCategory handleClickOpen={handleClickOpen} category={category} setCategory={setCategory}/>
     <ModalCategory error={error} category={category} addCategory={addCategory} open={open} handleClose={handleClose} handleChangeInput={handleChangeInput} />
    </div>
  );
}

export default Categories;
