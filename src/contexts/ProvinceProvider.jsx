import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProvinceContext = createContext();
function ProvinceProvider({children}) {
  const [province, setProvince] = useState([]);

  useEffect(() => {
    getAllProvince();
  }, []);

  const getAllProvince = async () => {
    try {
      const response = await axios.get(
        "https://api.vnappmob.com/api/v2/province/"
      );

      setProvince(response.data.results);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  return (
    <ProvinceContext.Provider value={province}>
      {children}
    </ProvinceContext.Provider>
  );
}

export default ProvinceProvider;
