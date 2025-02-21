const User = require("../Modals/user.modal");


module.exports={
    getUsers:async (req,res) => {
        const userId=req.user._id;
        try {
            const users=await User.find({_id:{$ne:userId}}).select(["_id","name",]);
            res.status(200).json({msg:"all users sended",users});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"all users sended"});
        }
    },
    sendMessage:async (req,res) => {
        const {text}=req.body;
    }
}