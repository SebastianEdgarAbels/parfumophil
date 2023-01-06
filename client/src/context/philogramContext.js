// aici o sa fac fetchu pt pagina principala cat si pt cea secundara
// 1. Import the hook

import { createContext, useEffect, useState } from "react";

// 2. Create the Context/Store
export const PhiloGramContext = createContext();

// 3. Create provide
export const PhiloGramContextProvider = (props) => {
  const [posts, setPosts] = useState();

  // ####################################### GET ALL POSTS ####################################### //

  const getAllPosts = async () => {
    // const urlencoded = new URLSearchParams();

    const requestOptions = {
      method: "GET",
      //   body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/philogram/all",
        requestOptions
      );
      const result = await response.json();
      // console.log("result :>> ", result);

      setPosts(result);
    } catch (error) {
      console.log("error by fetching allPosts", error);
    }
  };

  useEffect(() => {
    console.log("philoContext :>> ");
    getAllPosts();
  }, []);

  return (
    <PhiloGramContext.Provider value={{ posts }}>
      {props.children}
    </PhiloGramContext.Provider>
  );
};
