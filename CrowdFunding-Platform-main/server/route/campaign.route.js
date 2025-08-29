import express from "express";
import {
  campaignAdd,
  campaignfind,
  campaignFindById,
  campaigns,
  campaignUpdate,
  deleteCampaign,
} from "../controller/campaign.controller.js";

const router = express.Router();

router.post("/campaignadd", campaignAdd);
router.get("/campaignfind", campaignfind);
router.get("/campaigns",campaigns);
router.get("/campaignfindbyid",campaignFindById);
router.put("/campaignupdate/:id",campaignUpdate);
router.delete("/campaigndelete/:id",deleteCampaign);

export default router;
