import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  image:{
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    enum: ["Admin", "Creator", "Backer"],
  },
  fundDonated:{
    type: Number,
    default: 0,
  },
  fundRaised:{
    type:Number,
    default:0,
  },
  campaignCreated:{
    type: [String],
    default: [],
  },
  campaignDonated:{
    type:[{
      campaignId: {type:String},
      amountDonated: {type:Number},
      paymentId: {type:String},
    }],
    default:[]
  }
});

const user = mongoose.model("User", userSchema);

export default user;
