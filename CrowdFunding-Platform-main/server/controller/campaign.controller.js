import Campaign from "../models/campaign.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js"

export const campaignAdd = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      goal,
      deadline,
      creatorId,
      images,
    } = req.body;
    const camp = await Campaign.findOne({ title });
    if (camp) {
      return res
        .status(400)
        .json({ message: "This title already exist, Please choose another" });
    }
    if(!creatorId){
      return res.status(400).json({message:"Invalid User"});
    }
    const user = await User.findOne({_id:creatorId})
    if(!user){
      return res.status(400).json({message:"User does not exist"})
    }
    const createCampaign = await new Campaign({
      title: title,
      description: description,
      category: category,
      goal: goal,
      deadline: deadline,
      creatorId: creatorId,
      images: images
    });
    await createCampaign.save();
    user.campaignCreated.push(createCampaign._id.toString());
    await user.save();

    res.status(201).json({
      message: "Campaign created Successfully",
      campaignId: createCampaign._id
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const campaignfind = async (req, res) => {
  try {
    const { title } = req.body;
    const camp = await Campaign.find({ title });
    if (!camp) {
      return res.status(400).json({ message: "No Such Campaign exist" });
    }
    res.status(201).json({
      message: "Campaign Found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const campaigns = async (req,res)=>{
  try {
    const camp = await Campaign.find();
    if(!camp){
      return res.status(400).json({message:"No Campaign exist"});
    }
    res.status(201).json(camp);
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
    })
  }
}

export const campaignFindById = async (req,res)=>{
  try {
    const {_id} = req.query;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const camp = await Campaign.findOne({_id})
    if(!camp){
      return res.status(400).json({message:"No such campaign exist"});
    }
    res.status(200).json({camp});
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }
}

export const campaignUpdate = async(req,res)=>{
  try {
    const {id} = req.params;
    const updateData = req.body;
    
    const updatedCampaign = await Campaign.findByIdAndUpdate({_id:id}, updateData, {
      new: true,            
      runValidators: true   
    });
      if(!updatedCampaign){
            return res.status(400).json({message:"Campaign not found"})
          }
          res.status(200).json({
            message:"Campaign updated successfully",
            user: updatedCampaign,
          })

    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"})
  }
}

export const deleteCampaign = async(req,res)=>{
  try {
    const {id} = req.params;
    const trimmedId = id.replace(/^"|"$/g, '');
    if(!trimmedId && !mongoose.Types.ObjectId.isValid(trimmedId)){
      return res.status(400).json({message:"No such id exist"})
    }
    const campaign = await Campaign.findOne({_id:id});
    if(!campaign){
      return res.status(400).json({
        message:"No such Campaign exist"
      })
    }
    const deletedCampaign = await Campaign.findByIdAndDelete({_id:trimmedId});
    if(!deletedCampaign){
      return res.status(400).json({
        message:"Campaign not found",
      })
    }
    const creatorUser = await User.find({role:"Creator"});
    for (const creator of creatorUser) {
      const campaignsIds = creator.campaignCreated.filter(
        (campId) => String(campId) !== String(deletedCampaign._id)
      );

      try {
        const res = await fetch(`https://crowdfunding-platform-backend.onrender.com/user/updateuser/${creator._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ campaignCreated: campaignsIds }),
        });

        const data = await res.json();
        console.log(`Updated user ${creator._id}:`, data);
      } catch (error) {
        console.error(`Error updating user ${creator._id}:`, error);
      }
    }
    const backerUser = await User.find({role:"Backer"});
    for(const backer of backerUser){
      const campaignIds = backer.campaignDonated.filter((campaignss)=>{
        String(campaignss.campaignId) !== String(deletedCampaign._id)
      });
      try {
        const res = await fetch(`https://crowdfunding-platform-backend.onrender.com/user/updateuser/${backer._id}`,{
          method: "PUT",
          headers:{
            "content-Type": "application/json",
          },
          body: JSON.stringify({campaignDonated: campaignIds}),
        });
        const data = await res.json();
        console.log(`Updated user ${backer._id}:`, data);
      } catch (error) {
        console.log(`Error updating user ${backer._id}:`, error);
      }
    }
    res.status(200).json({
      message:"Campaign Deleted Successfully",
      user:deleteCampaign
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Internal Server Error",
    })
  }
}