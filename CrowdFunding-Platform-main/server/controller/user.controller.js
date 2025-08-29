import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user1 = await User.findOne({ email });
    if (user1) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const createUser = await new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    createUser.save();
    res.status(201).json({
      message: "User Created Successfully",
      user_id:createUser._id
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email " });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      res.status(201).json({
        message: "User Login Successfull",
        user_id:user._id
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async(req,res)=>{
  try {
    const {_id} = req.query;
    const trimmedId = _id.replace(/^"|"$/g, '');
    if(!trimmedId && !mongoose.Types.ObjectId.isValid(trimmedId)){
      return res.status(400).json({message:"No such id exist"})
    }
    const user = await User.find({_id:trimmedId});
    if(!user){
      return res.status(400).json({message:"No such user exist"})
    }
    else{
      res.status(200).json({
        message:"User found",
        user
      })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}

export const updateUser = async (req,res)=>{
  try {
     const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate({_id:id}, updateData, {
      new: true,            
      runValidators: true   
    });
    if(!updatedUser){
      return res.status(400).json({message:"User not found"})
    }
    res.status(200).json({
      message:"User updated successfully",
      user: updatedUser,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
}

export const getAllUsers = async (req,res)=>{
  try {
    const users = await User.find();
    if(!users){
      return res.status(400).json({message:"No user exist"});
    }
    res.status(200).json({
      message:"All users found",
      users
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal sever error"})    
  }
}

export const deleteUser = async (req,res)=>{
  try {
    const {id} = req.params;
    const trimmedId = id.replace(/^"|"$/g, '');
    if(!trimmedId && !mongoose.Types.ObjectId.isValid(trimmedId)){
      return res.status(400).json({message:"No such id exist"})
    }
    const user = await User.findOne({_id:trimmedId});
    if(!user){
      return res.status(400).json({
        message:"No such user exist"
      })
    }
    const deletedUser = await User.findByIdAndDelete({_id:trimmedId});
    if(!deleteUser){
      return res.status(400).json({
        message:"User not found",
      })
    }
    res.status(200).json({
      message:"User Deleted Successfully",
      user:deletedUser
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Internal Server Error",
    })
  }
}