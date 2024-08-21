const express = require('express');
const {mongoose} = require("mongoose")
const Payment = require('../model/Payment');
const router = express.Router();
const Carts = require('../model/Carts');
const ObjectId = mongoose.Types.ObjectId;

// token
const verifyToken = require('../middlewares/verifyToken')


// post payment
router.post('/',verifyToken,async(req,res)=>{
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment)
        // delete cartItems
        const cartIds = payment.cartItems.map(id=>new ObjectId(id))
        const deleteCartRequest = await Carts.deleteMany({_id:{$in: cartIds}})
        res.status(200).json(paymentRequest,deleteCartRequest);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.get('/',verifyToken, async(req,res)=>{
    const email = req.query.email;
    const query = {email: email};
    try {
        const decodedEmail = req.decoded.email;
        if(email !== decodedEmail){
            res.status(403).json({message: "Forbidden Access"})
        }
        const result   = await Payment.find(query).sort({createdAt:-1});
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message:error.message});

    }
})


module.exports = router;