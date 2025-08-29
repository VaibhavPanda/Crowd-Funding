import express from "express";
import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import User from "../models/user.model.js";
import Campaign from "../models/campaign.model.js"


export const checkout = async (req,res)=>{
    try {
        const options = {
        amount: Number(req.body.amount*100),
        currency: "INR"
        }
        const order = await instance.orders.create(options);

        res.status(200).json({
            message: "Payment Checkout Success",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const paymentVerification = async(req,res)=>{

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const { currUser, campaign } = req.body;
        // console.log(currUser)
        if(!currUser || !campaign){
            res.status(400).json({
                message:"No User Exist or No campaign exist",
                status: false,
            })
        }
        const _id = currUser._id;
        const user = await User.findOne({_id});
        const campaign_id = campaign._id;
        const currCampaign = await Campaign.findOne({_id:campaign_id});
        if(!user||!currCampaign){
            res.status(400).json({
                message:"No User Exist or No such Campaign Exist",
                status: false,
            })
        }
        // console.log(currCampaign);
        const razorpayOrder = await instance.orders.fetch(razorpay_order_id);

        if(razorpayOrder.status === "paid"){
            const body = razorpay_order_id + "|" + razorpay_payment_id;
        
            const expectedSignature = crypto
            .createHmac("sha256", process.env.Razorpay_key_Secret_API)
            .update(body.toString())
            .digest("hex");
            
            const isAuthentic = expectedSignature === razorpay_signature;
            if(isAuthentic){
                await Payment.create({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                });

                    const donatedAmount = razorpayOrder.amount/100;
                    const response = await fetch(`https://crowdfunding-platform-backend.onrender.com/user/getuserbyid?_id=${encodeURIComponent(currCampaign.creatorId)}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                        });

                    const data = await response.json(); 
                    const updatedUserCreator = {
                        fundRaised: data.user[0].fundRaised + donatedAmount,
                    }

                const resUserCreator = await fetch(`https://crowdfunding-platform-backend.onrender.com/user/updateuser/${currCampaign.creatorId}`,{
                    method: "PUT",
                    headers: {
                            "Content-Type": "application/json",
                        },
                    body: JSON.stringify(updatedUserCreator),   
                })
                
                const updateUserBacker = (currentUser, currentCampaign) => {
                    const donatedAmount = razorpayOrder.amount / 100;
                    const campaignIdStr = String(currentCampaign._id);

                    const updatedCampaignDonated = [...(currentUser.campaignDonated || [])];

                    const index = updatedCampaignDonated.findIndex(
                        (entry) => entry.campaignId === campaignIdStr
                    );

                    if (index !== -1) {
                        updatedCampaignDonated[index].amountDonated += donatedAmount;
                    } else {
                        updatedCampaignDonated.push({
                            campaignId: campaignIdStr,
                            amountDonated: donatedAmount,
                            paymentId: razorpay_payment_id, 
                        });
                    }

                    return {
                        fundDonated: currentUser.fundDonated + donatedAmount,
                        campaignDonated: updatedCampaignDonated,
                    };
                };

                const updatedUserBacker = updateUserBacker(user,currCampaign);

                const resUserBacker = await fetch(`https://crowdfunding-platform-backend.onrender.com/user/updateuser/${user._id}`,{
                    method: "PUT",
                    headers: {
                            "Content-Type": "application/json",
                        },
                    body: JSON.stringify(updatedUserBacker),
                })

                const updatedCampaign = {
                    amountRaised: currCampaign.amountRaised + (razorpayOrder.amount/100),
                }

                const resCampaign = await fetch(`https://crowdfunding-platform-backend.onrender.com/campaign/campaignupdate/${currCampaign._id}`,{
                    method: "PUT",
                    headers: {
                            "Content-Type": "application/json",
                        },
                    body: JSON.stringify(updatedCampaign)
                })
                res.status(200).json({
                    message:"Payment Successfull",
                    status: true,
                    razorpay_payment_id
                })
            }
            else{
                res.status(400).json({
                    status:false,
                    message:"Payment Failed",
                })
            }
        }
        else{
            res.status(400).json({
                message:"Payment not done",
                status: false
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}