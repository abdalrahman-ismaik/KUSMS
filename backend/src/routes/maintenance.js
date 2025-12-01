import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
  getAiSummaryForWeek,
} from "../controllers/maintenanceController.js";
import { verifyAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";

const router = express.Router();

/**
 * @route   GET /api/maintenance
 * @desc    Get all maintenance requests (filtered by role)
 * @access  Private (all authenticated users)
 */
router.get("/", verifyAuth, getRequests);

/**
 * @route   GET /api/maintenance/:id
 * @desc    Get a single maintenance request
 * @access  Private (creator, maintenance staff, admin)
 */
router.get(
  "/summary",
  verifyAuth,
  requireRole("MAINTENANCE"),
  getAiSummaryForWeek
);

router.get("/:id", verifyAuth, getRequestById);

/**
 * @route   POST /api/maintenance
 * @desc    Create a maintenance request
 * @access  Private (all authenticated users)
 */
router.post("/", verifyAuth, createRequest);

/**
 * @route   PATCH /api/maintenance/:id/status
 * @desc    Update maintenance request status
 * @access  Maintenance staff and admin only
 */
router.patch(
  "/:id/status",
  verifyAuth,
  requireRole("MAINTENANCE", "ADMIN"),
  updateRequestStatus
);

/**
 * @route   DELETE /api/maintenance/:id
 * @desc    Delete a maintenance request
 * @access  Admin only
 */
router.delete("/:id", verifyAuth, requireRole("ADMIN"), deleteRequest);

export default router;
