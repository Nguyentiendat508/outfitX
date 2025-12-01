import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DistrictContext = createContext();
function DistrictProvider({children}) {
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    getAllDistrict();
  }, []);

  const getAllDistrict = async () => {
    try {
      const response = await axios.get(
        `https://api.vnappmob.com/api/v2/province/district/`
      );
      setDistrict(response.data.results);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };
  console.log(district);
  
  return (
    <DistrictContext.Provider value={district}>
      {children}
    </DistrictContext.Provider>
  );
}

export default DistrictProvider;
