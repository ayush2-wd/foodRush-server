const Menu = require("../model/Menu")

const getAllMenuItems = async(req,res)=>{
    try{
        const menus = await Menu.find({}).sort({createdAt:-1});
        res.status(200).json(menus);
    }catch(error){
        res.send(500).json({message: error.message})
    }
}

// post new menu item
const postMenuItem = async(req,res)=>{
    const newItem = req.body
    try {
        const result  = await Menu.create(newItem);
        res.status(200).json(result);
    } catch (error) {
        res.send(500).json({message: error.message})
    }
} 

// delete menu item
const deleteMenuItem = async(req,res)=>{
    const menuId = req.params.id;
    const trimmed_id = menuId.trim()
    try {
        const deletedItem = await Menu.findByIdAndDelete(trimmed_id);
        if(!deletedItem){
            return res.status(404).json({message:"Menu Item not found"});
        }
        res.status(200).json({message:"Menu deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//  to get single menu item
const singleMneuItem = async(req,res)=>{
    const menuId = req.params.id;
    const trimmed_id = menuId.trim();
    try {
        const menu = await Menu.findById(trimmed_id)
        res.status(200).json(menu);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// update single menu item
const updateMenuItem = async(req,res)=>{
    const menuId = req.params.id;
    const trimmed_id = menuId.trim()
    const {name,recipe,image,category,price} = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(trimmed_id,{name,recipe,image,category,price},{new:true, runValidator:true});
        if(!updatedMenu){
            return res.status(404).json({message: "Menu not found"});
        }
        res.status(200).json(updatedMenu)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMneuItem,
    updateMenuItem
}