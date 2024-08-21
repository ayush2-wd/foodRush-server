const express  = require("express");
// const Menu = require("../model/Menu");
const router = express.Router();
const verifytokens = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

const userController = require("../controllers/userControllers");
router.get("/",verifytokens,verifyAdmin,userController.getAllUser);
router.post("/",userController.createUser);
router.delete("/:id",verifytokens,verifyAdmin,userController.deleteUser);
router.get("/admin/:email",verifytokens,userController.getAdmin);
router.patch("/admin/:id",verifytokens,verifyAdmin,userController.makeAdmin);

module.exports=router;