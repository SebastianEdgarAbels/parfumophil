import express from "express";

const router = express.Router();

// req vine de la front-end si res e trimis catre front-end
router.get("/test", (req, res) => {
  // res.send({ msg: "Test route." });
  res.json("Hello Backend World");
});

export default router;

/// Why if i put in package.json the start and bothServer the browers won't work anymore ????
////##### it was because i had to start it with npm run bothServers !!!!! ####////
