const express  = require("express");
const Menu = require("../model/Menu");
const router = express.Router();

const menuController = require("../controllers/menuControllers")


// get all menu items
router.get('/',menuController.getAllMenuItems);
//  post menu items
router.post('/',menuController.postMenuItem);
//  delete menu items
router.delete('/:id',menuController.deleteMenuItem)
// to get single menu item
router.get('/:id',menuController.singleMneuItem)
// update single menu item
router.patch('/:id',menuController.updateMenuItem)



module.exports = router;