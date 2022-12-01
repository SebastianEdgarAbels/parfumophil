import perfumeModel from "../models/perfumesModel.js";

const getAllPerfumes = async (req, res) => {
  try {
    const allPerfumes = await perfumeModel.find({});
    console.log("all Perfumes", allPerfumes);
    // send the res to our front-end and in the front-end I will have a const res.json and then I will map this
    res.status(200).json({ number: allPerfumes.length, allPerfumes });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

// in the async function I have to include my params or else I can't see nothing from the req or i can't send anything back
const getPerfumesByDesigner = async (req, res) => {
  console.log("req :>> ", req.params);
  // const perfumeDesigner = req.params.perfumeDesigner
  const { designer } = req.params;

  try {
    const requestedDesigners = await perfumeModel
      .find({
        designer: designer,
      })
      .exec();
    console.log("requestedDesigners:>>>>>>>", requestedDesigners);
    if (requestedDesigners.length === 0) {
      res.status(200).json({
        msg: "no designers found",
      });
    }
    res.status(200).json({
      number: requestedDesigners.length,
      requestedDesigners,
    });
  } catch (error) {
    console.log("error getting the results by designers:>> ", error);
    res.status(500).json({
      error: error,
      msg: "server error",
    });
  }
  // to make it case insensitive and match at least 1 or more letters
};

export { getAllPerfumes, getPerfumesByDesigner };
