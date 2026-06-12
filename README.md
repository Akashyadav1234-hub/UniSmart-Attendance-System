# 🎓 UniSmart: Institutional Intelligence, Unified

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-Vercel%20%7C%20Render-blue)
![Database](https://img.shields.io/badge/database-MongoDB%20Atlas-success)

UniSmart is a modern, decoupled full-stack Learning Management and Attendance System designed for institutional environments. It provides secure, OTP-based access portals for administrators, faculty, and students to manage academic operations efficiently.

---

## 🔗 Project Links

- 🌍 **Live Deployment:** https://uni-smart-attendance-system.vercel.app/
- 📄 **Official Documentation:** https://app.notion.com/p/UniSmart-Smart-Attendance-System-Project-37c6617a5d4380308530e27002cee310?pvs=28

---

# 🏗️ System Architecture

Rather than building a traditional monolith, UniSmart utilizes a **Decoupled Microservice Architecture** to ensure high performance, security, and scalability.

- **Frontend (Vercel):**
  Built with modern web technologies, the UI is deployed on Vercel's Edge Network for ultra-fast, globally distributed rendering of static assets and client-side logic.

- **Backend (Render):**
  An Express.js/Node.js server handles the heavy lifting, maintaining a persistent, stateful connection to the database and securely processing cross-origin requests (CORS).

- **Database (MongoDB Atlas):**
  A cloud-native NoSQL database storing persistent user states, session data, and institutional records.

- **Authentication Gateway (Mailtrap):**
  Dedicated SMTP infrastructure ensures reliable OTP delivery and avoids cloud provider email throttling.

---

# ✨ Key Features

- 🔐 Role-Based Access Control (RBAC)
- 📧 Passwordless OTP Authentication
- ⚡ Real-Time Data Synchronization
- ☁️ Cloud-Native Deployment
- 🛡️ Secure Environment Variable Management
- 👨‍🎓 Separate Dashboards for Admin, Faculty & Students

---

# 🛠️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + OTP |
| Email Service | Mailtrap SMTP |
| Deployment | Vercel + Render |

---

# 🚀 Getting Started

## Prerequisites

- Node.js v18+
- MongoDB Atlas Account
- Mailtrap Account

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Akashyadav1234-hub/UniSmart-Attendance-System.git
cd UniSmart-Attendance-System
```

---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/

# Authentication
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

# SMTP Configuration
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=465
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
```

---

## 4️⃣ Run the Backend

```bash
cd backend
npm run dev
```

---

## 5️⃣ Run the Frontend

Open another terminal.

```bash
cd frontend
npm run dev
```

---

# 📂 Project Structure

```
UniSmart-Attendance-System/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# 🧠 Engineering Decisions

## Why separate Vercel and Render?

Vercel is optimized for serving React applications with exceptional performance, while Render provides persistent server runtimes necessary for maintaining long-lived database connections and backend services.

## Why use Mailtrap instead of Gmail SMTP?

Cloud-hosted servers often face Gmail SMTP restrictions and spam filtering. Mailtrap provides a reliable transactional email gateway suitable for OTP delivery and testing.

## Why MongoDB Atlas?

MongoDB Atlas offers a managed, scalable, and cloud-native database solution with automatic backups and secure connectivity.

---

# 🔒 Security Features

- JWT Authentication
- OTP Verification
- Environment Variable Protection
- CORS Configuration
- Passwordless Login
- Secure SMTP Communication

---

# 📈 Future Enhancements

- AI-powered Attendance Analytics
- Face Recognition Attendance
- Mobile Application
- Notification System
- Performance Dashboard
- Report Generation
- Role Permission Management

---

# 👨‍💻 Author

**Akash Yadav**

🎓 B.Tech Computer Science (Cybersecurity & Digital Forensics)  
University of Petroleum and Energy Studies (UPES)

GitHub: https://github.com/Akashyadav1234-hub

LinkedIn: https://www.linkedin.com/in/akash-ydv22

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

# 📜 License

This project is intended for educational and academic purposes.
