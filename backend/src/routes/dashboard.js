import express from "express";
import {
  getDashboardStats,
  getBookingSuggestion,
} from "../controllers/dashboardController.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

// All dashboard routes require authentication
router.use(verifyAuth);

router.get("/stats", getDashboardStats);
router.get("/suggestions", getBookingSuggestion);

export default router;
