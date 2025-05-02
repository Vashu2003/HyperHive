import express from "express";
import { 
    createGroup, 
    getGroups, 
    updateGroup, 
    deleteGroup, 
    getNonMembers,
    addMemberToGroup } from "../controllers/groupController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Protected Routes
router.post("/create", protect, createGroup);
router.get("/", protect, getGroups);
router.put("/update/:id", protect, updateGroup);
router.delete("/delete/:id", protect, deleteGroup);
router.get("/:groupId/non-members", protect, getNonMembers);
router.put("/:groupId/add-member", protect, addMemberToGroup);



export default router;
