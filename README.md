# KUSMS - KU Smart Management System

KUSMS is a comprehensive campus management solution designed to streamline university operations, enhance resource utilization, and improve the overall campus experience for students, faculty, and staff.

## 🚀 Core Functionalities

The system is built around four essential pillars that form the backbone of campus operations:

### 1. 🏢 Facility Booking Management

A robust reservation system for all campus resources.

- **Browse & Book**: Students and faculty can easily find and book classrooms, labs, and sports facilities.
- **Conflict Detection**: Automatic detection of scheduling conflicts to prevent double-booking.
- **Approval Workflow**: Administrative oversight with a streamlined approval process for all requests.
- **Real-time Availability**: Instant visibility into facility schedules.

### 2. 📅 Event Scheduling & Calendar

A centralized hub for all campus activities.

- **Master Calendar**: A unified view of all university events, deadlines, and activities.
- **Event Proposals**: Students and faculty can propose events for administrative review.
- **Management Tools**: Administrators can approve, reject, or modify event details.
- **Public Visibility**: Published events are instantly visible to the entire campus community.

### 3. 🔧 Maintenance Request Tracking

An efficient system for maintaining campus infrastructure.

- **Issue Reporting**: Easy submission of maintenance requests with location and description.
- **Status Tracking**: Real-time tracking of request status (Pending → In Progress → Completed).
- **Staff Dashboard**: Dedicated interface for maintenance staff to view and manage their task queue.
- **Notifications**: Automated updates to requesters when issues are resolved.

### 4. 🔐 User Authentication & Role Management

Secure and personalized access for all user types.

- **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for Students, Faculty, Admins, and Maintenance staff.
- **Secure Authentication**: JWT-based secure login system.
- **Personalized Dashboards**: Custom views tailored to each user's specific needs and responsibilities.

## 🤖 AI-Powered Modern Features

KUSMS integrates cutting-edge AI capabilities powered by **Google Gemini 2.5 Pro** to enhance user experience and operational efficiency:

### ✨ AI Booking Suggestions

Intelligent, personalized facility booking recommendations for students.

- **Usage Pattern Analysis**: Analyzes individual student booking history to identify preferences and patterns.
- **Smart Recommendations**: Suggests optimal booking times based on facility popularity and availability.
- **Facility Insights**: Provides detailed information about favorite facilities, busiest days, and quietest days.
- **Natural Language**: Generates friendly, encouraging suggestions using Google Gemini AI.
- **Real-time Generation**: Dynamically creates suggestions as students view their dashboard.

### 🔧 AI Maintenance Summary

Weekly maintenance workload analysis for efficient staff planning.

- **Workload Overview**: Automatically generates concise 3-6 sentence summaries of weekly maintenance activities.
- **Priority Identification**: Highlights urgent requests requiring immediate attention.
- **Category Analysis**: Identifies main maintenance categories (electrical, equipment, structural, etc.).
- **Impact Assessment**: Evaluates how maintenance issues affect campus operations.
- **Staff Dashboard Integration**: Displays AI summary prominently on maintenance staff dashboard for quick decision-making.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Material UI, Vite
- **Backend**: Node.js, Express.js
- **Database**: SQLite (Dev), Prisma ORM
- **Authentication**: JWT, Bcrypt
- **AI Integration**: Google Gemini 2.5 Pro API (`@google/generative-ai`)

## 🚦 Getting Started

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    ```

2.  **Install Dependencies**

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Setup Database**

    ```bash
    cd backend
    npx prisma generate
    npx prisma migrate deploy
    npx prisma db seed
    ```

4.  **Setup Environment Variables**

    Before running the application, you need to set up your environment variables. The backend requires a `.env` file with secrets like your database connection string and JWT secret.

    1.  Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    2.  Create a copy of the example file and name it `.env`:
        ```bash
        cp .env.example .env
        ```
    3.  Open the new `.env` file and fill in the required values. For the new AI feature, you will need to add your `GEMINI_API_KEY`.

5.  **Run the Application**

    ```bash
    # Start Backend (Port 3000)
    cd backend
    npm run dev

    # Start Frontend (Port 5173)
    cd frontend
    npm run dev
    ```

## 📂 Project Structure

```
KUSMS/
├── backend/         # Node.js/Express API & Prisma
├── frontend/        # React/TypeScript Client
├── docs/            # Documentation
└── specs/           # Feature Specifications
```
