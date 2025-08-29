import mongoose from "mongoose";

const campaignSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 600,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Medical",
      "Memorials",
      "Non-Profit",
      "Education",
      "Emergencies",
      "Children",
      "Animal",
      "Sports",
      "Community",
      "Elderly",
      "Art & Media",
      "Women",
      "Technology",
      "Environment",
      "Social Entrepreneurship",
      "Human Rights",
      "Rural Development",
      "Livelihood",
      "Loans",
      "Construction",
      "Others",
    ],
  },
  goal: {
    type: Number,
    require: true,
  },
  amountRaised: {
    type: Number,
    require: true,
    default: 0,
  },
  deadline: {
    type: Date,
    default: () => new Date("2040-12-31T00:00:00Z"),
  },
  creatorId: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    default: []
  }
});

const campaign = mongoose.model("Campaign", campaignSchema);

export default campaign;
