require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose=require("mongoose")
const bodyParser=require("body-parser");


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 

mongoose.connect('mongodb://localhost:27017/Payment_Details', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const PORT= process.env.PORT || 4242

const paymentController=require("./Controllers/PaymentController")

app.post("/api/create-checkout-session",paymentController.checkoutSession)

app.post('/success', paymentController.successSave);
  




app.listen(PORT,()=>{
    console.log("server start"+PORT)
})