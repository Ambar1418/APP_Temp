# Feedants - Competition Details Screen (Full-Stack Module)

A full-stack, production-grade implementation of the **Feedants Competition Details Screen**, built as part of the Feedants Full Stack Development Internship Technical Assignment.

---

## 🌟 Overview

This application serves dynamic competition data from a Node.js + Express backend to a React Native (Web) frontend, featuring real-time spot tracking, atomic concurrency control, multi-language support (English / Hindi), live countdown timers, video submission modals, and state management.

---

## 🚀 Key Features

* **Dynamic Data Integration**: All competition details, dates, prize pools, entry fees, spot availability, and user states are fetched live from the backend API.
* **Atomic Concurrency Handling**: High-concurrency registration using MongoDB `$expr` + `$lt` atomic queries to guarantee that spot overbooking never occurs under concurrent load.
* **Responsive UI Layout**: Built with React Native Web matching the reference design layout including headers, tags, judge profile, countdown timers, tabbed guidelines, prize breakdown, referral cards, and user reviews.
* **Interactive Modals**:
  * **Video Modal**: Video preview for judge intro and participant submissions.
  * **Submission Modal**: Form to submit video URL, title, and notes for registered participants.
  * **User Reviews Modal**: Full participant feedback and ratings.
* **Multi-Language Support**: One-click toggle between English (`ENG`) and Hindi (`हिंदी`).
* **Demo Reset Feature**: Included `↻ Reset` action in the header to effortlessly reset backend registration state back to initial default (`1/20 Booked`) during evaluation and testing.

---

## 🏗️ Architecture & Tech Stack

### Frontend
* **Framework**: React Native Web + React 19 + Vite
* **State Management**: React Context (`AppContext`) with dynamic API synchronization
* **Icons & Styling**: Lucide React + Native StyleSheet objects
* **Fonts**: Google Fonts (`Plus Jakarta Sans`)

### Backend
* **Runtime & Server**: Node.js + Express.js
* **Database**: MongoDB (Mongoose ORM) with automatic in-memory fallback via `mongodb-memory-server`
* **Data Seeding**: Automatic initial seed for `feedants-dance-101` on server startup

---

## 🛠️ Instructions for Running Locally

### Prerequisites
* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher

### 1. Running the Backend Server
```bash
cd backend
npm install
npm start
```
> The API server will start on `http://localhost:5001`. On boot, if no `MONGODB_URI` environment variable is defined, it automatically spins up an in-memory MongoDB server and seeds the competition database.

### 2. Running the Frontend App
```bash
cd frontend
npm install
npm run dev
```
> The web application will launch at `http://localhost:5173`.

---

## ⚙️ Environment Variables / Configuration

### Backend (`backend/.env`)
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5001` | Express server port |
| `MONGODB_URI` | *(Optional)* | Custom MongoDB connection URI. If omitted, uses embedded `MongoMemoryServer`. |

---

## 📌 Technical Decisions & Assumptions

### 1. Important Assumptions
* **User Authentication Context**: For demo simplicity, a persistent user context (`x-user-id: demo-user-123`) is passed in API request headers to simulate real authenticated session states.
* **Dynamic Spot Reservation**: Total max spots are set to `20` with `1` initial spot booked (`19 spots left`), demonstrating dynamic calculations served directly from MongoDB.

### 2. Major Technical Decisions
* **Atomic Concurrency Control**: Rather than read-then-write checks (which cause race conditions under high concurrency), registration updates use MongoDB's atomic `findOneAndUpdate`:
  ```javascript
  const updatedCompetition = await Competition.findOneAndUpdate(
    {
      _id: competitionId,
      $expr: { $lt: ['$bookedSpots', '$maxSpots'] }
    },
    { $inc: { bookedSpots: 1 } },
    { new: true }
  );
  ```
* **React Native Web Strategy**: Utilizing React Native Web components (`View`, `Text`, `TouchableOpacity`, `ScrollView`, `StyleSheet`) guarantees code reusability across web browsers and native iOS/Android apps.

### 3. Trade-offs Considered
* **In-Memory MongoDB Fallback vs. Cloud Cluster**: Integrated `mongodb-memory-server` as default fallback so the evaluator can clone and run the project immediately without configuring external DB credentials.

### 4. Production Improvements & Next Steps
* **JWT Authentication & Middleware**: Integrate OAuth2 / JWT authentication middleware instead of demo request headers.
* **Payment Gateway Integration**: Connect Razorpay Webhooks to confirm real registration fee processing before marking `isRegistered: true`.
* **AWS S3 Direct Upload**: Support direct video file uploading to S3 with pre-signed URLs instead of linking external video URLs.
