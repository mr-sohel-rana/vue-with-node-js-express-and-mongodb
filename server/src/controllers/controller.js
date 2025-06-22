const read=(req,res)=>{
    res.status(200).json({status:"succes",data:"success"})
} 
const User = require('../models/userModel'); 

const user = async (req, res) => {
  try {
    const {name,email,dept} = req.body;
    const newUser = await User.create({name,email,dept});

    res.status(201).json({
      status: "success",
      data: newUser
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};
 const userGet=async(req,res)=>{
    try{
        const users=await User.find({})
    res.status(200).json({status:"success",data:users})

    }catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
 }
 const deleteUser=async(req,res)=>{
        try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }


 }

 const update = async (req, res) => {
    try {
        const id = req.params.id;
        const reqBody = req.body;
        const user = await User.findByIdAndUpdate(id, reqBody, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user, message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ error: error.message, message: "Something went wrong" });
    }
};

module.exports={
    read,user,userGet,deleteUser,update
}
