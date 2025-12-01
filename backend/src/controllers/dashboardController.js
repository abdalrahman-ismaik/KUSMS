import prisma from "../utils/prisma.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";
import { generateBookingSuggestion } from "../utils/aiService.js";

/**
 * Get dashboard statistics based on user role
 */
export async function getDashboardStats(req, res, next) {
  try {
    const { role, id: userId } = req.user;

    let stats = {};

    switch (role) {
      case "ADMIN":
        stats = await getAdminStats();
        break;
      case "STUDENT":
      case "FACULTY":
        stats = await getStudentStats(userId);
        break;
      case "MAINTENANCE":
        stats = await getMaintenanceStats(userId);
        break;
      default:
        stats = {};
    }

    res.json({ stats });
  } catch (error) {
    next(error);
  }
}

async function getAdminStats() {
  const results = await Promise.all([
    prisma.user.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.event.count({ where: { status: "PENDING" } }),
    prisma.booking.count({
      where: {
        status: "APPROVED",
        endTime: { gte: new Date() },
      },
    }),
    prisma.facility.count(),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true, facility: true },
    }),
    prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { creator: true },
    }),
    // Get utilization data for the top 5 facilities
    prisma.facility.findMany({
      take: 5,
      include: {
        _count: {
          select: { bookings: { where: { status: "APPROVED" } } },
        },
      },
    }),
  ]);

  const [
    totalUsers,
    pendingBookings,
    pendingEvents,
    activeBookings,
    totalFacilities,
    recentBookings,
    recentEvents,
    facilities,
  ] = results;

  // Calculate utilization and generate AI insights
  const utilization = facilities
    .map((f) => {
      // Simple heuristic: Assume max capacity is 50 bookings/week for demo purposes
      // In a real app, this would be calculated based on time slots
      const bookingCount = f._count.bookings;
      const maxCapacity = 50;
      const percentage = Math.min(
        Math.round((bookingCount / maxCapacity) * 100),
        100
      );

      let insight = "Optimal usage";
      if (percentage > 80)
        insight = "High demand - Consider adding similar resources";
      else if (percentage < 20)
        insight = "Underutilized - Consider repurposing space";

      return {
        id: f.id,
        name: f.name,
        percentage,
        insight,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  // Combine and sort recent activity
  const recentActivity = [
    ...recentBookings.map((b) => ({
      id: b.id,
      type: "BOOKING",
      title: `${b.facility.name} - ${b.user.name}`,
      status: b.status,
      date: b.createdAt,
    })),
    ...recentEvents.map((e) => ({
      id: e.id,
      type: "EVENT",
      title: e.title,
      status: e.status,
      date: e.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return {
    totalUsers,
    pendingApprovals: pendingBookings + pendingEvents,
    activeBookings,
    totalFacilities,
    recentActivity,
  };
}

async function getStudentStats(userId) {
  const [activeBookings, upcomingEvents, pendingBookings, lastBooking] =
    await Promise.all([
      prisma.booking.count({
        where: {
          userId,
          status: "APPROVED",
          endTime: { gte: new Date() },
        },
      }),
      prisma.event.count({
        where: {
          status: "PUBLISHED",
          startTime: { gte: new Date() },
        },
      }),
      prisma.booking.count({
        where: {
          userId,
          status: "PENDING",
        },
      }),
      prisma.booking.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { facility: true },
      }),
    ]);

  let suggestion = {
    title: "Explore Facilities",
    message:
      "Check out our new sports complex! It is less busy on Tuesday mornings.",
  };

  if (lastBooking) {
    suggestion = {
      title: "Smart Rebooking",
      message: `You recently used ${lastBooking.facility.name}. Based on your history, we recommend booking it again for next week.`,
    };
  } else if (pendingBookings > 0) {
    suggestion = {
      title: "Status Update",
      message:
        "Your booking is being reviewed. Approvals usually take 24 hours.",
    };
  }

  return {
    activeBookings,
    upcomingEvents,
    pendingBookings,
    suggestion,
  };
}

async function getMaintenanceStats(userId) {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const [pendingRequests, assignedTasks, facilityRisks] = await Promise.all([
    prisma.maintenanceRequest.count({
      where: { status: "PENDING" },
    }),
    prisma.maintenanceRequest.count({
      where: {
        assignedTo: userId,
        status: "IN_PROGRESS",
      },
    }),
    prisma.facility.findMany({
      take: 5,
      include: {
        _count: {
          select: {
            maintenanceRequests: {
              where: { createdAt: { gte: ninetyDaysAgo } },
            },
          },
        },
      },
    }),
  ]);

  // Calculate predictive risks
  const predictedRisks = facilityRisks
    .map((f) => {
      const requestCount = f._count.maintenanceRequests;
      let riskLevel = "LOW";
      let prediction = "Routine maintenance only";

      if (requestCount >= 5) {
        riskLevel = "HIGH";
        prediction = "Critical failure likely within 14 days";
      } else if (requestCount >= 3) {
        riskLevel = "MEDIUM";
        prediction = "Monitor closely for recurring issues";
      }

      return {
        id: f.id,
        name: f.name,
        requestCount,
        riskLevel,
        prediction,
      };
    })
    .filter((r) => r.requestCount > 0)
    .sort((a, b) => b.requestCount - a.requestCount);

  return {
    pendingRequests,
    assignedTasks,
    predictedRisks,
  };
}

/**
 * Get AI-powered booking suggestion for a user
 */
export async function getBookingSuggestion(req, res, next) {
  try {
    const { id: userId } = req.user;

    // 1. Find the user's most frequently booked facility
    const favoriteFacilityResult = await prisma.booking.groupBy({
      by: ["facilityId"],
      where: {
        userId,
        status: "APPROVED",
      },
      _count: {
        facilityId: true,
      },
      orderBy: {
        _count: {
          facilityId: "desc",
        },
      },
      take: 1,
    });

    if (favoriteFacilityResult.length === 0) {
      return res.json({
        suggestion: {
          title: "Start Booking!",
          message:
            "You have not utilized the university's facilities yet. Start booking to get personalized suggestions!",
        },
      });
    }

    const facilityId = favoriteFacilityResult[0].facilityId;
    // console.log(`Favorite Facility ID: ${facilityId}`);
    const favoriteFacility = await prisma.facility.findUnique({
      where: { id: facilityId },
    });
    // console.log(favoriteFacility);

    const message = await generateBookingSuggestion(favoriteFacility);
    // console.log(`AI message before response: ${message}`);
    return res.json({
      suggestion: {
        title: "AI Booking Suggestion",
        message,
      },
    });
  } catch (error) {
    next(error);
  }
}
