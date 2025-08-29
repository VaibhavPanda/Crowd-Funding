import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./route/user.route.js";
import campaignRoute from "./route/campaign.route.js";
import paymentRoute from "./route/payment.route.js"
import Razorpay from "razorpay";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); 


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error: ", error);
}

app.use("/user", userRoute);
app.use("/campaign", campaignRoute);
app.use("/pay",paymentRoute)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

console.log(process.env.Razorpay_key_API)

export const instance = new Razorpay({
  key_id: process.env.Razorpay_key_API,
  key_secret: process.env.Razorpay_key_Secret_API,
})

app.get("/", (req, res) => {
  res.send("It's Working!");
});

app.get("/apikey",(req,res)=>{
  res.status(200).json({key:process.env.Razorpay_key_API})
})

app.listen(PORT || 4500, () => {
  console.log("Server is running on Port", PORT);
});
