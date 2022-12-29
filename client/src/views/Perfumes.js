import React, { useEffect, useState } from "react";
// here i will put pich with parfumes and if a user clicks on 1 will be redirected to another page with more details
function Perfumes() {
  const [perfumes, setPerfumes] = useState();
  const [error, setError] = useState();

  const fetchAllPerfumes = async () => {
    try {
      const urlAllPerfumes = "http://localhost:5000/api/perfumes/all";
      const response = await fetch(urlAllPerfumes);
      const results = await response.json();
      console.log("results :>> ", typeof results.allPerfumes[0]);
      console.log("results :>> ", results.allPerfumes);

      // ################################ //
      // const res = results.allPerfumes;

      // res.map((result, i) => {
      //   return result[i]
      // }).for(const x in result[i]) {

      // }
      // ################################ //

      setPerfumes(results.allPerfumes);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllPerfumes();
  }, []);

  return (
    <div>
      {perfumes &&
        perfumes.map((perfume, index) => {
          return (
            <div key={index}>
              <p>{perfume.name}</p>
              <p>{perfume.perfum_notes.basisnotes}</p>

              <p>{perfume.designer}</p>
              <p>{error}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Perfumes;
