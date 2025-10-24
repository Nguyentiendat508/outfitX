import React, { useState } from 'react';
import Search from '../../../../components/admin/Search';
import TableCategory from './TableCategoryType';
import ModalCategoryType from './ModalCategoryType';
import { addDocument, updateDocument } from '../../../../services/firebaseService';

const inner = {name : "" , description : "", cateId : "", creatAt : new Date()};
function CategoryType() {
    const [open, setOpen] = useState(false);
    const [categoryType, setCategoryType] = useState(inner);
    const [error,setError] = useState(inner);

    const handleClickOpen = () => {
      setOpen(true);
      setCategoryType(inner);
      setError(inner);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChangeInput = (e) => {
      setCategoryType({...categoryType, [e.target.name] : e.target.value })
    }

    const validation = () => {
      const newError = {} ;
      newError.name = categoryType.name ? "" : "Vui long nhap name" ;
      newError.description = categoryType.description ? "" : "vui long nhap description";
      setError(newError) ;
      return Object.values(newError).some(e => e !== "");
    }

    const addCategoryType  = async () => {
           if(validation()) {
            return;
           }
           if(categoryType.id) {
              await updateDocument("category_Types", categoryType);
           }else{
              await addDocument("category_Types", categoryType);
           }
           setCategoryType(inner);
           handleClose();
    }

    return (
        <div className="m-5">
           <Search handleClickOpen={handleClickOpen} title={"List Category Type"} />
           <TableCategory handleClickOpen={handleClickOpen} categoryType={categoryType} setCategoryType={setCategoryType} />
           <ModalCategoryType error={error} categoryType={categoryType} addCategoryType={addCategoryType} open={open} handleClose={handleClose} handleChangeInput={handleChangeInput} />
        </div>
    );
}

export default CategoryType;