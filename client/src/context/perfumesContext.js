// 1. Import the hook
import { createContext, useEffect, useState } from "react";

// 2. Create Context/Store
export const PerfumesContext = createContext();

// 3. Create provide
export const PerfumesContextProvider = (props) => {
  const [perfumes, setPerfumes] = useState();

  // #################### GET THE PERFUMES #################### //
  // ########################################################## //

  const getAllPerfumes = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/perfumes/all",
        requestOptions
      );
      const result = await response.json();
      // console.log("perfumes :>> ", result.allPerfumes);
      setPerfumes(result.allPerfumes);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllPerfumes();
  }, []);

  return (
    <PerfumesContext.Provider value={{ perfumes }}>
      {props.children}
    </PerfumesContext.Provider>
  );
};
