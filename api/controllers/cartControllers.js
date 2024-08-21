const Carts = require("../model/Carts");

// get carts using email id 
const getCartByEmail= async(req,res)=>{
    try{
        const email = req.query.email;
        const query = {email:email};
        const result = await Carts.find(query).exec();
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// add  to cart
const addToCart = async(req,res)=>{
    const {menuItemId,name,recipe,image,price,quantity,email}=req.body;
    try{
        const existingCartItems = await Carts.findOne({menuItemId})
        if(existingCartItems){
            return res.status(400).json({message: "Product already exists in the cart"});
        }
        const cartItem = await Carts.create({
            menuItemId,name,recipe,image,price,quantity,email
        })
        res.status(201).json(cartItem);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// deleting cart item
const deleteCart = async(req,res)=>{
    const cartId = req.params.id;
    try{
        const deleteCart = await Carts.findByIdAndDelete(cartId);
        if(deleteCart){
            return res.status(401).json({message: "Cart items not found!"});
        }
        return res.status(200).json({message: "Cart items deleted successfully!"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// update cart

const updateCart = async(req,res)=>{
    const cartId = req.params.id;
    const {menuItemId,name,recipe,image,price,quantity,email}=req.body;
    try{
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId,{menuItemId,name,recipe,image,price,quantity,email},{
                new:true,runValidators:true,
            }
        )
        if(!updateCart){
            return res.status(404).json({message:"Cart Item not found!"});
        }
        return res.status(200).json(updatedCart);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// get single cart

const getSingleCart = async(req,res)=>{
    const cartId = req.params.id;
    try{
        const cartItem = await Carts.findById(cartId)
        res.status(200).json(cartItem);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart,
}