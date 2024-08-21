const express = require('express')
const app = express()
const port = process.env.PORT || 6001
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_ACCESS_KEY);



// middlewares
app.use(cors());
app.use(express.json())

// mongodb configuration


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g3tot2n.mongodb.net/foodrushdb?retryWrites=true&w=majority&appName=Cluster0`).then(
    console.log("mongodb connected successfully")
).catch((error)=>console.log( "error connecting to mongodb",error))

//  jwt authentification
app.post('/jwt',async(req,res)=>{
  const user = req.body;
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SERVER,{
    expiresIn:'1hr',
    // crypto.randomBytes(64).toString('hex'); 
  })
  res.send({token});
})



// importing routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes.js')
app.use("/menu",menuRoutes);
app.use("/carts",cartRoutes);
app.use("/users",userRoutes);
app.use('/payments',paymentRoutes);


// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount  = price*100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: [
    "card",
  ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})