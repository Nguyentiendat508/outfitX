export const getOjectById = (data,id) => {
   console.log(data);
   console.log(id);
   
   return data?.find(e => e.id == id) ;
}
export const filterById = (data, title, id) => {
   return data?.filter(e => e[title] == id );
}

export const convertsize = (size) => {
      if(size > 82) {
          return "2XL" ; //>83
      }else if(size >= 72 ) {
          return "XL" ; //72
      }if(size > 65) {
         return "L";//66
      }else if (size >= 57) {
         return "M"; //57
      }if(size > 50) {
         return "S"; //51
      }else{
         return size;
      }
}

export const convertString = (string ) => {
    return string.length > 30 ? string.slice(0,30) + "..." : string ;
}