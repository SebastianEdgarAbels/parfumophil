import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import perfumesRoutes from "./routes/perfumesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import cloudinaryConfig from "./cloudinary.js";
import passport from "passport";
import passportConfig from "./passport.js";

// loading .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const addMiddleWares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOption));
  cloudinaryConfig();
  app.use(passport.initialize());
  // instead of use app.use(and in here to put all the info that i put into the passport.js  from line 10 to 33)
  passportConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Sever is running on  :>> " + port + " port");
    console.log("Yuhuu !!! Is working !!!");
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/perfumes", perfumesRoutes);
  app.use("/api/users", usersRoutes);
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB is running in port:>> ", port);
  } catch (error) {
    console.log("error connectin to MongoDB", error);
  }
};

// this is a IIFE (Immediately Invoked Function Expression) function
(async function controller() {
  await mongoDBConnection();
  addMiddleWares();
  loadRoutes();
  startServer();
})(); // so this function to autoinvoke add () at the end
