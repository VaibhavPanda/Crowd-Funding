import express from "express";
import { deleteUser, getAllUsers, getUserById, login, signup, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getuserbyid", getUserById);
router.put("/updateuser/:id",updateUser);
router.get("/getalluser",getAllUsers);
router.delete("/deleteuser/:id",deleteUser);

export default router;
