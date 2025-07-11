import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { connectDB } from './config/db.js';

import productsRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products",productsRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  })
}

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:'+ PORT);
});

//jirathkh
//3WWJ7hh890eQBG8g