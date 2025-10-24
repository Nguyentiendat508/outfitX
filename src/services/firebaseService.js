import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { uploadImageToCloudinary } from "../config/cloudinaryConfig";


export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values ) => {
  try {
    
      if(values?.imgUrl) {
         const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
         values.imgUrl = imgUrl ;
      }
   
     
if (values?.imgUrls?.length > 0) {

  // Chờ tất cả ảnh upload xong rồi mới gán lại
  const imgUrls = await Promise.all(
    values.imgUrls.map((e) => uploadImageToCloudinary(e, collectionName))
  );

  values.imgUrls = imgUrls;

}
       
    await addDoc(collection(db, collectionName), values);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};


export const deleteDocument = async (collectionName, values) => {
 
  // Xóa tài liệu khỏi Firestore
  await deleteDoc(doc(collection(db, collectionName), values.id));
};

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName, values) => {
  if(values?.imgUrl) {
    console.log("vfsvb");
    
         const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
         values.imgUrl = imgUrl ;
      }
if (values?.imgUrls?.length > 0) {
  // Chờ tất cả ảnh upload xong rồi mới gán lại
  const imgUrls = await Promise.all(
    values.imgUrls.map((e) => uploadImageToCloudinary(e, collectionName))
  );

  values.imgUrls = imgUrls;
}


  await updateDoc(doc(collection(db, collectionName), values.id), values);
};