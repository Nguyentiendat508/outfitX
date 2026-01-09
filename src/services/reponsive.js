export const getOjectById = (data,id) => {  
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

export const formatTime = (ts) => {
  if (!ts?.seconds) return "";
  const d = new Date(ts.seconds * 1000);
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};