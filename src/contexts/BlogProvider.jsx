import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';

export const BlogContext = createContext();
function  BlogProvider({children}) {
     const [blogs,setBlogs] = useState([]);

     useEffect(() => {
       // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
       const unsubscribe = fetchDocumentsRealtime("blogs", (blogList) => {
          setBlogs(blogList);
        });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
     },[]);

    return (
        <BlogContext.Provider value={blogs}>
             {children}
        </BlogContext.Provider>
    );
}

export default BlogProvider;