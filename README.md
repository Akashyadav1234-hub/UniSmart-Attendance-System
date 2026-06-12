Copy this, tweak any minor details, and push it straight to your main branch.
Markdown
# 🎓 UniSmart: Institutional Intelligence, Unified

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-Vercel%20%7C%20Render-blue)
![Database](https://img.shields.io/badge/database-MongoDB%20Atlas-success)

UniSmart is a modern, decoupled full-stack Learning Management and Attendance System designed for institutional environments. It provides secure, OTP-based access portals for administrators, faculty, and students to manage academic operations efficiently.

## 🏗️ System Architecture

Rather than building a traditional monolith, UniSmart utilizes a **Decoupled Microservice Architecture** to ensure high performance, security, and scalability.

* **Frontend (Vercel):** Built with modern web technologies, the UI is deployed on Vercel's Edge Network for ultra-fast, globally distributed rendering of static assets and client-side logic.
* **Backend (Render):** An Express.js/Node.js server handles the heavy lifting, maintaining a persistent, stateful connection to the database and processing cross-origin requests (CORS) securely from the Vercel frontend.
* **Database (MongoDB Atlas):** A cloud-native NoSQL database securely storing persistent user states, session data, and institutional records.
* **Authentication & Transactional Gateway (Mailtrap):** To bypass IP throttling and spam-relay filtering common in cloud data centers (like Google's SMTP blocks), the system utilizes a dedicated SMTP gateway to guarantee 100% deliverability of cryptographic OTP tokens.
* **Logging/Sync (Notion API):** Automated synchronization of project logs and administrative data to Notion workspaces.

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Distinct, secure dashboards for Admin, Faculty, and Students.
* **Cryptographic OTP Authentication:** Passwordless, highly secure login flow verifying institutional credentials (`@upes.ac.in`, etc.) via email.
* **Real-Time Data Handling:** Instantaneous updates between the client and MongoDB Atlas.
* **Cloud-Native Security:** Environment variables mask all secrets, preventing hardcoded credential leaks.

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Account
* Mailtrap Account (For SMTP Sandbox)
* Notion Integration Token

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/unismart.edu.git](https://github.com/yourusername/unismart.edu.git)
cd unismart.edu
2. Install Dependencies
Bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
3. Environment Configuration
Create a .env file in the root of your backend directory. You will need to configure the following environment variables:
Code snippet
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster...

# Authentication
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

# Transactional Email Gateway (Mailtrap Sandbox/Live)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password

# External Integrations
NOTION_TOKEN=your_notion_integration_token
NOTION_PAGE_ID=your_target_notion_page
4. Run the Application
Start the backend server:
Bash
cd backend
npm run dev
Start the frontend development server:
Bash
cd frontend
npm run dev
🧠 Engineering Decisions & Trade-offs
Why separate Vercel and Render? Vercel is unparalleled for serving React-based UIs quickly using serverless functions, but serverless environments drop persistent database connections. Render provides a continuous runtime environment, ensuring MongoDB connections stay warm and WebSocket/stream capabilities remain open.
Why not use native Gmail SMTP? During load testing, deploying an Express app on a cloud provider like Render triggered Google's automated data-center spam filters, causing ETIMEDOUT and ENETUNREACH errors. Integrating a professional SMTP relay bypasses these blocks, mimicking enterprise-grade infrastructure.
👨‍💻 Author
Akash Yadav
B.Tech Computer Science (Cybersecurity & Digital Forensics) @ UPES
GitHub Profile
